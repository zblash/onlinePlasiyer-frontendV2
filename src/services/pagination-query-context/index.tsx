import * as React from 'react';
import lodashContact from 'lodash.concat';
import lodashGet from 'lodash.get';
import lodashUniqBy from 'lodash.uniqby';
import { PaginationQueryContext } from './context';
import { useDatabaseObjectsContext } from '../database-object-context/context';
import { getRouteId, getRouteByEndpoint } from '../utils';
import { QueryHandlerParams } from './helpers';
import { MaybeArray } from '~/helpers';
import { RouteSchema } from '../helpers';
import { paginationQueryEndpoints } from './pagination-query-endpoints';
import { RefetchQuery } from '../mutation-context/helpers';
import { asyncMap } from '~/utils';
import { useApiCallContext } from '../api-call-context/context';
import { useObjectState } from '~/utils/hooks';
import { backendObjectFunctions } from '../utils/route-schema';

type RouteStorage = Array<{
  schema: MaybeArray<RouteSchema>;
  pageNumber: number;
}>;

function PaginationQueryContextProvider(props) {
  const { fetchIfNotExist, fetch } = useApiCallContext();
  const { setObjectsFromBackendResponse, getObjects } = useDatabaseObjectsContext();
  const [routeStorage, setRouteStorage] = useObjectState<Record<string, RouteStorage>>({});

  const thenFactory = React.useCallback(
    (params: QueryHandlerParams) => {
      return data => {
        const routeId = getRouteId(getRouteByEndpoint(paginationQueryEndpoints, params.query), params.variables);
        const values = data.values.map(item => ({ ...item, pageIndex: params.pageNumber }));
        const routeSchema = backendObjectFunctions.dataToSchema(data);
        setObjectsFromBackendResponse(values);
        setRouteStorage({
          [routeId]: lodashUniqBy(
            [
              {
                pageNumber: params.pageNumber,
                schema: routeSchema,
              },
              ...(lodashGet(routeStorage, `${routeId}.storage`, []) as []),
            ],
            'pageNumber',
          ),
        });

        return { routeId, lastPageNumber: data.totalPage, elementCountOfPage: data.elementCountOfPage };
      };
    },
    [routeStorage, setObjectsFromBackendResponse, setRouteStorage],
  );

  const queryHandler = React.useCallback(
    (params: QueryHandlerParams) =>
      fetchIfNotExist(params.query, { ...params.variables, pageNumber: params.pageNumber }).then(thenFactory(params)),
    [fetchIfNotExist, thenFactory],
  );

  const getDataByRouteId = React.useCallback(
    (routeId: string) => {
      const routeSchemas = routeStorage[routeId]
        .slice()
        .reverse()
        .map(storage => storage.schema);
      const result = lodashContact(
        [],
        ...routeSchemas.map(schema => backendObjectFunctions.schemaToData(schema, getObjects())),
      );

      return result;
    },
    [getObjects, routeStorage],
  );
  const isRouteFetchedForAnyPage = React.useCallback(
    (routeId: string) => {
      return Boolean(routeStorage[routeId]);
    },
    [routeStorage],
  );

  const refetchQueries = React.useCallback(
    (queries: RefetchQuery[]) => {
      const fetchedQueries = queries.filter(({ query, variables }) =>
        isRouteFetchedForAnyPage(getRouteId(getRouteByEndpoint(paginationQueryEndpoints, query), variables)),
      );

      return asyncMap(
        fetchedQueries.map(({ query, variables }) => {
          const routeId = getRouteId(getRouteByEndpoint(paginationQueryEndpoints, query), variables);

          return () =>
            asyncMap(
              routeStorage[routeId].map(({ pageNumber }) => () =>
                fetch(query, {
                  pageNumber,
                  ...variables,
                }).then(thenFactory({ pageNumber, query, variables })),
              ),
            );
        }),
      );
    },
    [fetch, isRouteFetchedForAnyPage, routeStorage, thenFactory],
  );
  const contextValues = React.useMemo(() => ({ queryHandler, refetchQueries, getDataByRouteId }), [
    getDataByRouteId,
    queryHandler,
    refetchQueries,
  ]);

  return <PaginationQueryContext.Provider value={contextValues}>{props.children}</PaginationQueryContext.Provider>;
}

export { PaginationQueryContextProvider };
