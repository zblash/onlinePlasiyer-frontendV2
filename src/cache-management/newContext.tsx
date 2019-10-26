import * as React from 'react';
import deepEqual from 'deep-equal';
import { isArray, getKeyByValue } from '~/utils';
import { queryEndpoints } from '~/services';
import { getRouteSchema, getRouteId, separatingObjectsContainingId } from './utils';
import { CommonEnpointOptions, EndpointsResultType } from './helpers';

type QueryOptions<T> = {} & CommonEnpointOptions<T>;

interface CacheContext {
  query: <T>(query: T, options: QueryOptions<T>) => Promise<EndpointsResultType<T>>;
}

const CacheContext = React.createContext<CacheContext>({
  query: () => Promise.resolve(null),
});

function CacheContextProvider() {
  const [databaseObjects, setDatabaseObjects] = React.useState({});
  const [queryRouteSchemes, setQueryRouteSchemes] = React.useState({});
  const query: CacheContext['query'] = (query, options) => {
    return Promise.resolve(null);
  };

  return <CacheContext.Provider value={{ query }}></CacheContext.Provider>;
}
