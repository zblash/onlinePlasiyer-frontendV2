import * as React from 'react';
import deepEqual from 'deep-equal';
import { QueryContext } from './context';
import { QueryHandlerParams } from './helpers';
import { getRouteId, getRouteByEndpoint, deepMergeIdObjects } from '../utils';
import { useDatabaseObjectsContext } from '../database-object-context/context';
import { backendObjectFunctions } from '../utils/route-schema';
import { queryEndpoints } from './query-endpoints';
import { RefetchQuery } from '../mutation-context/helpers';
import { asyncMap, objectForeach } from '~/utils';
import { useApiCallContext } from '../api-call-context/context';
import { useObjectState } from '~/utils/hooks';
import { MaybeArray } from '~/helpers';
import { RouteSchema } from '../helpers';

interface QueryContextProviderProps {}

function QueryContextProvider(props: React.PropsWithChildren<QueryContextProviderProps>) {
  const databaseContext = useDatabaseObjectsContext();
  const { fetchIfNotExist: getIfNotExist, fetch: get } = useApiCallContext();
  const [routeDataStore, setRouteDataStore] = useObjectState<Record<string, any>>({});
  const [routeSchemas, setRouteSchemas] = useObjectState<Record<string, MaybeArray<RouteSchema>>>({});

  const isRouteCacheTaken = React.useCallback((routeId: string) => routeSchemas[routeId] && routeDataStore[routeId], [
    routeDataStore,
    routeSchemas,
  ]);

  // TODO: refactor this function
  const thenFactory = React.useCallback(
    (params: QueryHandlerParams) => data => {
      const currenRouteId = getRouteId(getRouteByEndpoint(queryEndpoints, params.query), params.variables);
      const seperatedObj = backendObjectFunctions.separateData(data);
      const idDatabaseNewValue = deepMergeIdObjects(databaseContext.getObjects(), seperatedObj);
      const newSchema = backendObjectFunctions.dataToSchema(data);
      const changedRoutes = [];
      const newStorageObj = {};
      changedRoutes.forEach(route => {
        newStorageObj[route] = backendObjectFunctions.schemaToData(routeSchemas[route], idDatabaseNewValue);
      });
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
      } else {
        setRouteDataStore({ [currenRouteId]: data });
        setRouteSchemas({ [currenRouteId]: newSchema });
      }
      if (!deepEqual(idDatabaseNewValue, databaseContext.getObjects())) {
        databaseContext.setObjectsFromBackendResponse(seperatedObj);
      }

      return currenRouteId;
    },
    [databaseContext, isRouteCacheTaken, routeDataStore, routeSchemas, setRouteDataStore, setRouteSchemas],
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
      newStorageObj[route] = backendObjectFunctions.schemaToData(routeSchemas[route], databaseObjects);
    });
    if (!deepEqual(routeDataStore, { ...routeDataStore, ...newStorageObj })) {
      setRouteDataStore(newStorageObj);
    }
  }, [databaseContext, routeDataStore, routeSchemas, setRouteDataStore, isRouteCacheTaken]);

  const queryHandler = React.useCallback(
    (params: QueryHandlerParams) => {
      return getIfNotExist(params.query, params.variables).then(thenFactory(params));
    },
    [getIfNotExist, thenFactory],
  );

  const refetchQueries = React.useCallback(
    (queries: Array<RefetchQuery> = []) => {
      const fetchedQueries = queries.filter(({ query, variables }) =>
        isRouteCacheTaken(getRouteId(getRouteByEndpoint(queryEndpoints, query), variables)),
      );

      return asyncMap(
        fetchedQueries.map(({ query, variables }) => () => {
          return get(query, variables).then(thenFactory({ query, variables }));
        }),
      );
    },
    [get, isRouteCacheTaken, thenFactory],
  );

  const getDataByRouteId = React.useCallback((routeId: string) => routeDataStore[routeId], [routeDataStore]);
  React.useEffect(() => {
    updateStoreIfUsedIdsChange();
  }, [updateStoreIfUsedIdsChange]);

  const contextValues = React.useMemo(
    () => ({
      queryHandler,
      refetchQueries,
      getDataByRouteId,
    }),
    [getDataByRouteId, queryHandler, refetchQueries],
  );

  return <QueryContext.Provider value={contextValues}>{props.children}</QueryContext.Provider>;
}

export { QueryContextProvider };
