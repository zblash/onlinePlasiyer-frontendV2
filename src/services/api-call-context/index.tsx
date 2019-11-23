import * as React from 'react';
import { ApiCallContext } from './context';
import { ApiCallContextProviderProps, QueryQueue, ApiCallContextType } from './helpers';
import { getRouteId, getRouteByEndpoint } from '../utils';
import { queryEndpoints } from '../query-context/query-endpoints';
import { paginationQueryEndpoints } from '../pagination-query-context/pagination-query-endpoints';
import { BasicQuery } from '../helpers';
import Queue from '../utils/queue';

const allEndpoints = { ...queryEndpoints, ...paginationQueryEndpoints };

function ApiCallContextProvider(props: React.PropsWithChildren<ApiCallContextProviderProps>) {
  const queryResults = React.useRef({});
  const queryQueue = React.useRef<QueryQueue>({});
  const isRouteFetched = React.useCallback((routeId: string) => Boolean(queryResults.current[routeId]), []);
  const getQueue = React.useCallback((routeId: string) => queryQueue.current[routeId], []);

  const fetchIfNotExist = React.useCallback(
    (query: BasicQuery, variables: any) => {
      const routeId = getRouteId(getRouteByEndpoint(allEndpoints, query), variables);
      if (isRouteFetched(routeId)) {
        return Promise.resolve(queryResults.current[routeId]);
      }
      const queue = getQueue(routeId);
      if (queue) {
        return queue.push(() => fetchIfNotExist(query, variables));
      }
      queryQueue.current[routeId] = new Queue();

      return queryQueue.current[routeId].push(() =>
        query(variables).then(result => {
          queryResults.current[routeId] = result;

          return result;
        }),
      );
    },
    [getQueue, isRouteFetched],
  );

  const fetch = React.useCallback(
    (query: BasicQuery, variables: any) => {
      const routeId = getRouteId(getRouteByEndpoint(allEndpoints, query), variables);

      const queue = getQueue(routeId);
      if (!queue) {
        queryQueue.current[routeId] = new Queue();
      }

      return queryQueue.current[routeId].push(() =>
        query(variables).then(result => {
          queryResults.current[routeId] = result;

          return result;
        }),
      );
    },
    [getQueue],
  );
  const contextValue = React.useMemo<ApiCallContextType>(() => ({ fetchIfNotExist, fetch }), [fetchIfNotExist, fetch]);

  return <ApiCallContext.Provider value={contextValue}>{props.children}</ApiCallContext.Provider>;
}

export { ApiCallContextProvider };