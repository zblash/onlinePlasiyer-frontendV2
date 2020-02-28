import * as React from 'react';
import { ApiCallContext } from './context';
import { ApiCallContextProviderProps, QueryQueue, ApiCallContextType } from './helpers';
import { getRouteId } from '../utils/index';
import { BasicQuery } from '../helpers/index';
import Queue from '../utils/queue';
import { useDatabaseObjectsContext } from '../database-object-context/context';
import { backendObjectFunctions } from '../utils/route-schema';

function ApiCallContextProvider(props: React.PropsWithChildren<ApiCallContextProviderProps>) {
  const databaseContext = useDatabaseObjectsContext();
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
  const dataWriter = React.useCallback((result, routeId) => {
    let data = result;
    if (!Array.isArray(result) && Array.isArray(result.values)) {
      data = { ...result, id: routeId };
    }
    queryResults.current[routeId] = data;

    return data;
  }, []);

  const fetch = React.useCallback(
    (query: BasicQuery, variables: any, staticData?: any) => {
      const routeId = getRouteId(query, variables);
      if (staticData) {
        return Promise.resolve(dataWriter(staticData, routeId));
      }

      return getQueueOrCreate(routeId).push(async () =>
        query(variables).then(result => {
          return dataWriter(result, routeId);
        }),
      );
    },
    [dataWriter, getQueueOrCreate],
  );

  const fetchIfNotExist = React.useCallback(
    (query: BasicQuery, variables: any) => {
      const routeId = getRouteId(query, variables);
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
  React.useEffect(() => {
    Object.keys(queryResults.current).forEach(routeId => {
      const schema = backendObjectFunctions.dataToSchema(getQueryResult(routeId));
      queryResults.current[routeId] = backendObjectFunctions.schemaToData(schema, databaseContext.getObjects());
    });
  }, [databaseContext, getQueryResult]);
  const contextValue = React.useMemo<ApiCallContextType>(() => ({ fetchIfNotExist, fetch }), [fetchIfNotExist, fetch]);

  return <ApiCallContext.Provider value={contextValue}>{props.children}</ApiCallContext.Provider>;
}

export { ApiCallContextProvider };
