import * as React from 'react';
import { ApiCallContext } from './context';
import { ApiCallContextProviderProps, QueryQueue, ApiCallContextType } from './helpers';
import { getRouteId, getRouteByEndpoint } from '../utils';
import { queryEndpoints } from '../query-context/query-endpoints';
import { BasicQuery } from '../helpers';
import Queue from '../utils/queue';
import { paginationQueryEndpoints } from '../query-context/pagination-query-endpoints';

const allQueries = { ...queryEndpoints, ...paginationQueryEndpoints };

function ApiCallContextProvider(props: React.PropsWithChildren<ApiCallContextProviderProps>) {
  const queryResults = React.useRef({});
  const queryQueue = React.useRef<QueryQueue>({});
  const isRouteFetched = React.useCallback((routeId: string) => Boolean(queryResults.current[routeId]), []);
  const getQueryResult = React.useCallback((routeId: string) => queryResults.current[routeId], []);
  const getQueue = React.useCallback((routeId: string) => {
    return queryQueue.current[routeId];
  }, []);
  const getQueueOrCreate = React.useCallback(
    (routeId: string) => {
      const queue = getQueue(routeId);
      if (queue) {
        return queue;
      }
      queryQueue.current[routeId] = new Queue();

      return queryQueue.current[routeId];
    },
    [getQueue],
  );

  const fetch = React.useCallback(
    (query: BasicQuery, variables: any) => {
      const routeId = getRouteId(getRouteByEndpoint(allQueries, query), variables);

      return getQueueOrCreate(routeId).push(async () =>
        query(variables).then(result => {
          let data = result;
          if (!Array.isArray(result) && Array.isArray(result.values)) {
            data = { ...result, id: routeId };
          }
          queryResults.current[routeId] = data;

          return data;
        }),
      );
    },
    [getQueueOrCreate],
  );

  const fetchIfNotExist = React.useCallback(
    (query: BasicQuery, variables: any) => {
      const routeId = getRouteId(getRouteByEndpoint(allQueries, query), variables);
      if (isRouteFetched(routeId)) {
        return Promise.resolve(getQueryResult(routeId));
      }
      const queue = getQueue(routeId);
      if (queue) {
        return queue.push(async () => fetchIfNotExist(query, variables));
      }

      return fetch(query, variables);
    },
    [isRouteFetched, getQueue, getQueryResult, fetch],
  );
  const contextValue = React.useMemo<ApiCallContextType>(() => ({ fetchIfNotExist, fetch }), [fetchIfNotExist, fetch]);

  return <ApiCallContext.Provider value={contextValue}>{props.children}</ApiCallContext.Provider>;
}

export { ApiCallContextProvider };
