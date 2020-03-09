import * as React from 'react';
import deepEqual from 'deep-equal';
import { QueryContext } from './context';
import { QueryHandlerParams, QueryContextType } from './helpers';
import { getRouteId, deepMergeIdObjects } from '../utils/index';
import { useDatabaseObjectsContext } from '../database-object-context/context';
import { backendObjectFunctions } from '../utils/route-schema';
import { RefetchQuery } from '../mutation-context/helpers';
import { asyncMap, objectForeach, isArray } from '~/utils/index';
import { useApiCallContext } from '../api-call-context/context';
import { useObjectState } from '~/utils/hooks';
import { MaybeArray } from '~/helpers/index';
import { RouteSchema } from '../helpers/index';

interface QueryContextProviderProps {}

function QueryContextProvider(props: React.PropsWithChildren<QueryContextProviderProps>) {
  const databaseContext = useDatabaseObjectsContext();
  const paginationFetchedPages = React.useRef<Record<string, Array<number>>>({});
  const { fetchIfNotExist: getIfNotExist, fetch: get } = useApiCallContext();
  const [routeDataStore, setRouteDataStore] = useObjectState<Record<string, any>>({});
  const [routeSchemas, setRouteSchemas] = useObjectState<Record<string, MaybeArray<RouteSchema>>>({});

  const isRouteCacheTaken = React.useCallback(
    (routeId: string) => Boolean(routeSchemas[routeId] && routeDataStore[routeId]),
    [routeDataStore, routeSchemas],
  );

  const addPageToPaginationStore = React.useCallback((routeId: string, pageNumber: number) => {
    if (paginationFetchedPages.current[routeId]) {
      paginationFetchedPages.current[routeId].push(pageNumber);
    } else {
      paginationFetchedPages.current[routeId] = [pageNumber];
    }
  }, []);
  const getDataByRouteId = React.useCallback(
    (routeId: string) => {
      const result = routeDataStore[routeId];

      return result;
    },
    [routeDataStore],
  );

  const staticDataParser = React.useCallback(
    (params: QueryHandlerParams) => data => {
      const variables = params.paginationVariables
        ? { ...params.variables, ...params.paginationVariables }
        : params.variables;
      const currenRouteId = getRouteId(params.query, variables);
      const currenRouteIdWithoutPageNumber = getRouteId(params.query, params.variables);
      if (params.paginationVariables && typeof params.paginationVariables.pageNumber === 'number') {
        addPageToPaginationStore(currenRouteIdWithoutPageNumber, params.paginationVariables.pageNumber);
      }
      const changedRoutes = [];
      const newStorageObj = {};
      changedRoutes.forEach(route => {
        newStorageObj[route] = backendObjectFunctions.schemaToData(routeSchemas[route], idDatabaseNewValue);
      });

      const newSchema = backendObjectFunctions.dataToSchema(data);
      const seperatedObj = backendObjectFunctions.separateData(data);
      const idDatabaseNewValue = deepMergeIdObjects(databaseContext.getObjects(), seperatedObj);
      if (!deepEqual(idDatabaseNewValue, databaseContext.getObjects())) {
        databaseContext.setObjectsFromBackendResponse(seperatedObj);
      }
      if (isRouteCacheTaken(currenRouteId)) {
        const currentRoutePrevSchema = routeSchemas[currenRouteId];
        const isChangeCurrentRoute = !deepEqual(
          routeDataStore[currenRouteId],
          backendObjectFunctions.schemaToData(currentRoutePrevSchema, databaseContext.getObjects()),
        );

        if (isChangeCurrentRoute) {
          newStorageObj[currenRouteId] = data;
        }
        if (!deepEqual(newSchema, currentRoutePrevSchema)) {
          setRouteSchemas({ [currenRouteId]: newSchema });
        }
        if (!deepEqual(routeDataStore, { ...routeDataStore, ...newStorageObj })) {
          setRouteDataStore(newStorageObj);
        }

        return { routeId: currenRouteId, ...params, queryResult: data };
      }
      setRouteDataStore({ [currenRouteId]: data });
      setRouteSchemas({ [currenRouteId]: newSchema });

      return { routeId: currenRouteId, ...params, queryResult: data };
    },
    [
      addPageToPaginationStore,
      databaseContext,
      isRouteCacheTaken,
      routeDataStore,
      routeSchemas,
      setRouteDataStore,
      setRouteSchemas,
    ],
  );
  const updateStoreIfUsedIdsChange = React.useCallback(() => {
    const changedRoutes = [];
    const newStorageObj = {};
    const databaseObjects = databaseContext.getObjects();
    objectForeach(routeDataStore, routeId => {
      if (isRouteCacheTaken(routeId)) {
        const currentRoutePrevSchema = routeSchemas[routeId];
        const isChangeCurrentRoute = !deepEqual(
          routeDataStore[routeId],
          backendObjectFunctions.schemaToData(currentRoutePrevSchema, databaseObjects),
        );

        if (isChangeCurrentRoute) {
          changedRoutes.push(routeId);
        }
      }
    });
    changedRoutes.forEach(route => {
      if (Object.keys(databaseObjects).length > 0) {
        newStorageObj[route] = backendObjectFunctions.schemaToData(routeSchemas[route], databaseObjects);
      }
    });
    if (!deepEqual(routeDataStore, { ...routeDataStore, ...newStorageObj })) {
      setRouteDataStore(newStorageObj);
    }
  }, [databaseContext, routeDataStore, routeSchemas, setRouteDataStore, isRouteCacheTaken]);

  const queryHandler = React.useCallback(
    (params: QueryHandlerParams) => {
      return getIfNotExist(params.query, { ...params.variables, ...params.paginationVariables }).then(
        staticDataParser(params),
      );
    },
    [getIfNotExist, staticDataParser],
  );

  const refetchQueries = React.useCallback(
    (queries: Array<RefetchQuery> = [], mutationResult: any) => {
      const fetchingQueries = queries.filter(
        ({ query, variables, type }) => isRouteCacheTaken(getRouteId(query, variables)) && type === 'normal',
      );
      const chainQueries = queries.filter(
        ({ query, variables, type }) => isRouteCacheTaken(getRouteId(query, variables)) && type === 'chain',
      );
      queries
        .filter(({ type }) => type === 'pagination')
        .forEach(({ query, variables, type }) => {
          const routeId = getRouteId(query, variables);
          const fetchedPages = paginationFetchedPages.current[routeId];
          if (isArray(fetchedPages)) {
            fetchedPages.forEach(pageNumber => {
              fetchingQueries.push({ query, variables: { ...variables, pageNumber }, type });
            });
          }
        });

      return asyncMap([
        ...fetchingQueries.map(({ query, variables }) => () =>
          get(query, variables).then(staticDataParser({ query, variables })),
        ),
        ...chainQueries.map(({ query, variables }) => async () =>
          get(query, variables, mutationResult).then(staticDataParser({ query, variables })),
        ),
      ]);
    },
    [get, isRouteCacheTaken, staticDataParser],
  );

  React.useEffect(() => {
    updateStoreIfUsedIdsChange();
  }, [updateStoreIfUsedIdsChange]);

  const contextValues = React.useMemo<QueryContextType>(
    () => ({
      staticDataParser,
      queryHandler,
      refetchQueries,
      getDataByRouteId,
    }),
    [getDataByRouteId, queryHandler, refetchQueries, staticDataParser],
  );

  return <QueryContext.Provider value={contextValues}>{props.children}</QueryContext.Provider>;
}

export { QueryContextProvider };
