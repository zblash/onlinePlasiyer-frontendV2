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

interface QueryContextProviderProps {}

function QueryContextProvider(props: React.PropsWithChildren<QueryContextProviderProps>) {
  const databaseObjectsContext = useDatabaseObjectsContext();
  const parseSchema = useParseSchema();
  const [routeSchemas, setRouteSchemas] = React.useState<Record<string, MaybeArray<RouteSchema>>>({});
  const queryQueue = React.useRef({});

  function queryHandler(params: QueryHandlerParams) {
    const { query, variables } = params;
    const routeId = getRouteId(getRouteByEndpoint(queryEndpoints, query), variables);
    const isCurrentRouteFetched = isRouteFetched(routeId);
    if (isCurrentRouteFetched) {
      return Promise.resolve(routeId);
    }
    if (!queryQueue.current[routeId]) {
      queryQueue.current[routeId] = queryApiCall(params).then(() => routeId);
    } else {
      queryQueue.current[routeId].then(() => queryHandler(params)).then(() => routeId);
    }

    return queryQueue.current[routeId];
  }

  function queryApiCall(params: QueryHandlerParams) {
    const { query, variables } = params;
    const routeId = getRouteId(getRouteByEndpoint(queryEndpoints, query), variables);

    return query(variables)
      .then(data => {
        const routeSchema = dataToSchema(data);
        setRouteSchemas(prevSate => ({ ...prevSate, [routeId]: routeSchema }));
        databaseObjectsContext.setObjectsFromBackendResponse(data);

        return data;
      })
      .finally(() => {
        queryQueue.current[routeId] = undefined;
      });
  }

  function isRouteFetched(routeId: string) {
    return Boolean(routeSchemas[routeId]);
  }

  function getDataByRouteId(routeId: string) {
    const schema = routeSchemas[routeId];

    return parseSchema(schema);
  }

  function refetchQueries(queries: RefetchQuery[] = []) {
    const fetchedQueries = queries.filter(({ query, variables }) =>
      isRouteFetched(getRouteId(getRouteByEndpoint(queryEndpoints, query), variables)),
    );

    return asyncMap(
      fetchedQueries.map(({ query, variables }) => () => {
        return queryApiCall({ variables, query });
      }),
    );
  }

  return (
    <QueryContext.Provider value={{ queryHandler, refetchQueries, getDataByRouteId }}>
      {props.children}
    </QueryContext.Provider>
  );
}

export { QueryContextProvider };
