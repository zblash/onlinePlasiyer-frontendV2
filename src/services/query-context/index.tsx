import * as React from 'react';
import { QueryContext } from './context';
import { QueryHandlerParams } from './helpers';
import { getRouteId, getRouteByEndpoint } from '../utils';
import { useDatabaseObjectsContext } from '../database-object-context/context';
import { RouteSchema } from '../helpers';
import { dataToSchema } from '../utils/route-schema';
import { useParseSchema } from '../utils/useParseScheme';
import { MaybeArray } from '~/helpers';
import { queryEndpoints } from './query-endpoints';
import { RefetchQuery } from '../mutation-context/helpers';
import { asyncMap } from '~/utils';
import { useApiCallContext } from '../api-call-context/context';

interface QueryContextProviderProps {}

function QueryContextProvider(props: React.PropsWithChildren<QueryContextProviderProps>) {
  const databaseObjectsContext = useDatabaseObjectsContext();
  const { fetchIfNotExist: getIfNotExist, fetch: get } = useApiCallContext();
  const parseSchema = useParseSchema();
  const [routeSchemas, setRouteSchemas] = React.useState<Record<string, MaybeArray<RouteSchema>>>({});

  const isRouteFetched = React.useCallback(
    (routeId: string) => {
      return Boolean(routeSchemas[routeId]);
    },
    [routeSchemas],
  );
  const thenFactory = React.useCallback(
    (params: QueryHandlerParams) => data => {
      const routeId = getRouteId(getRouteByEndpoint(queryEndpoints, params.query), params.variables);
      const routeSchema = dataToSchema(data);
      setRouteSchemas(prevSate => ({ ...prevSate, [routeId]: routeSchema }));
      databaseObjectsContext.setObjectsFromBackendResponse(data);

      return routeId;
    },
    [databaseObjectsContext],
  );
  const queryHandler = React.useCallback(
    (params: QueryHandlerParams) => getIfNotExist(params.query, params.variables).then(thenFactory(params)),
    [getIfNotExist, thenFactory],
  );

  const getDataByRouteId = React.useCallback(
    (routeId: string) => {
      const schema = routeSchemas[routeId];

      return parseSchema(schema);
    },
    [parseSchema, routeSchemas],
  );
  const refetchQueries = React.useCallback(
    (queries: Array<RefetchQuery> = []) => {
      const fetchedQueries = queries.filter(({ query, variables }) =>
        isRouteFetched(getRouteId(getRouteByEndpoint(queryEndpoints, query), variables)),
      );

      return asyncMap(
        fetchedQueries.map(({ query, variables }) => () => {
          return get(query, variables).then(thenFactory({ query, variables }));
        }),
      );
    },
    [get, isRouteFetched, thenFactory],
  );
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
