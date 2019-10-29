import * as React from 'react';
import deepEqual from 'deep-equal';
import { isArray, getKeyByValue } from '~/utils';
import { getRouteSchema, getRouteId, separatingObjectsContainingId } from './utils';
import { CommonEnpointOptions, EndpointsResultType } from './helpers';

type QueryOptions<T> = {} & CommonEnpointOptions<T>;

interface ServicesContext {
  query: <T>(query: T, options: QueryOptions<T>) => Promise<EndpointsResultType<T>>;
}

const ServicesContext = React.createContext<ServicesContext>({
  query: () => Promise.resolve(null),
});

function ServicesContextProvider() {
  const [databaseObjects, setDatabaseObjects] = React.useState({});
  const [queryRouteSchemes, setQueryRouteSchemes] = React.useState({});
  const query: ServicesContext['query'] = (query, options) => {
    return Promise.resolve(null);
  };

  return <ServicesContext.Provider value={{ query }}></ServicesContext.Provider>;
}
