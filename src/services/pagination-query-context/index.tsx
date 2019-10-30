import * as React from 'react';
import { EndpointsResultType, QueryVariablesOptions, EndpointsVariablesType, RouteSchema } from '../helpers';
import { PaginationQueryContext } from './context';
import { useParseSchema } from '../utils/useParseScheme';
import { useDatabaseObjectsContext } from '../database-object-context/context';
import { getRouteId, getRouteByEndpoint } from '../utils';
import { QueryHandlerParams } from './helpers';
import { MaybeArray } from '~/helpers';
import { dataToSchema } from '../utils/route-schema';

function PaginationQueryContextProvider(props) {
  const queryQueue = React.useRef({});
  const databaseObjectsContext = useDatabaseObjectsContext();
  const parseSchema = useParseSchema();
  const [routeSchemas, setRouteSchemas] = React.useState<Record<string, MaybeArray<RouteSchema>>>({});
  function queryHandler(params: QueryHandlerParams) {
    const { query, variables } = params;
    const routeId = getRouteId(getRouteByEndpoint(query), variables);
    const isCurrentRouteFetched = isRouteFetched(routeId);
    if (isCurrentRouteFetched) {
      return Promise.resolve(getDataByRouteId(routeId));
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
    const routeId = getRouteId(getRouteByEndpoint(query), variables);
    return query({ ...variables, pageNumber: 0 })
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
  return <PaginationQueryContext.Provider value={{}}>{props.children}</PaginationQueryContext.Provider>;
}

export { PaginationQueryContextProvider };
