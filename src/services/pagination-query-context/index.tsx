import * as React from 'react';
import lodashContact from 'lodash.concat';
import lodashGet from 'lodash.get';
import lodashUniqBy from 'lodash.uniqby';
import { PaginationQueryContext } from './context';
import { useParseSchema } from '../utils/useParseScheme';
import { useDatabaseObjectsContext } from '../database-object-context/context';
import { getRouteId, getRouteByEndpoint } from '../utils';
import { QueryHandlerParams } from './helpers';
import { MaybeArray } from '~/helpers';
import { dataToSchema } from '../utils/route-schema';
import { RouteSchema } from '../helpers';
import { paginationQueryEndpoints } from './pagination-query-endpoints';
import { RefetchQuery } from '../mutation-context/helpers';
import { asyncMap } from '~/utils';
import { useApiCallContext } from '../api-call-context/context';
import { useObjectState } from '~/utils/hooks';

type RouteStorage = Array<{
  schema: MaybeArray<RouteSchema>;
  pageNumber: number;
}>;

function PaginationQueryContextProvider(props) {
  const { fetchIfNotExist: getIfNotExist, fetch: get } = useApiCallContext();
  const { setObjectsFromBackendResponse } = useDatabaseObjectsContext();
  const parseSchema = useParseSchema();
  const [routeStorage, setRouteStorage] = useObjectState<Record<string, RouteStorage>>({});

  const resultHandler = React.useCallback(
    (routeId: string, pageNumber: number, data: any) => {
      const values = data.values.map(item => ({ ...item, pageIndex: pageNumber }));
      const routeSchema = dataToSchema(values);
      setObjectsFromBackendResponse(values);
      setRouteStorage({
        [routeId]: lodashUniqBy(
          [
            {
              pageNumber,
              schema: routeSchema,
            },
            ...(lodashGet(routeStorage, `${routeId}.storage`, []) as []),
          ],
          'pageNumber',
        ),
      });

      return { routeId, lastPageNumber: data.totalPage, elementCountOfPage: data.elementCountOfPage };
    },
    [routeStorage, setObjectsFromBackendResponse, setRouteStorage],
  );
  const thenFactory = React.useCallback(
    (params: QueryHandlerParams) => {
      return data => {
        const routeId = getRouteId(getRouteByEndpoint(paginationQueryEndpoints, params.query), params.variables);

        return resultHandler(routeId, params.pageNumber, data);
      };
    },
    [resultHandler],
  );

  const queryHandler = React.useCallback(
    (params: QueryHandlerParams) =>
      getIfNotExist(params.query, { ...params.variables, pageNumber: params.pageNumber }).then(thenFactory(params)),
    [getIfNotExist, thenFactory],
  );

  const getDataByRouteId = React.useCallback(
    (routeId: string) => {
      const routeSchemas = routeStorage[routeId]
        .slice()
        .reverse()
        .map(storage => storage.schema);
      const result = lodashContact([], ...routeSchemas.map(schema => parseSchema(schema)));

      return result;
    },
    [parseSchema, routeStorage],
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
                get(query, {
                  pageNumber,
                  ...variables,
                }).then(thenFactory({ pageNumber, query, variables })),
              ),
            );
        }),
      );
    },
    [get, isRouteFetchedForAnyPage, routeStorage, thenFactory],
  );
  const contextValues = React.useMemo(() => ({ queryHandler, refetchQueries, getDataByRouteId }), [
    getDataByRouteId,
    queryHandler,
    refetchQueries,
  ]);

  return <PaginationQueryContext.Provider value={contextValues}>{props.children}</PaginationQueryContext.Provider>;
}

export { PaginationQueryContextProvider };
