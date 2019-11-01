import * as React from 'react';
import lodashContact from 'lodash.concat';
import lodashGet from 'lodash.get';
import { PaginationQueryContext } from './context';
import { useParseSchema } from '../utils/useParseScheme';
import { useDatabaseObjectsContext } from '../database-object-context/context';
import { getRouteId, getRouteByEndpoint } from '../utils';
import { QueryHandlerParams } from './helpers';
import { MaybeArray } from '~/helpers';
import { dataToSchema } from '../utils/route-schema';
import { RouteSchema } from '../helpers';
import { isArray } from '~/utils';
import { paginationQueryEndpoints } from './pagination-query-endpoints';

type RouteStorage = {
  lastPageNumber: number;
  storage: Array<{
    schema: MaybeArray<RouteSchema>;
    pageNumber: number;
  }>;
};

function PaginationQueryContextProvider(props) {
  const queryQueue = React.useRef({});
  const databaseObjectsContext = useDatabaseObjectsContext();
  const parseSchema = useParseSchema();
  const [routeStorage, setRouteStorage] = React.useState<Record<string, RouteStorage>>({});
  function queryHandler(params: QueryHandlerParams) {
    const { query, variables } = params;
    const routeId = getRouteId(getRouteByEndpoint(paginationQueryEndpoints, query), variables);
    const isCurrentRouteFetched = isRouteFetched(routeId, params.pageNumber);
    if (isCurrentRouteFetched) {
      return Promise.resolve({ routeId, lastPageNumber: routeStorage[routeId].lastPageNumber });
    }
    if (!queryQueue.current[routeId]) {
      queryQueue.current[routeId] = queryApiCall(params).then(data => ({ routeId, lastPageNumber: data.totalPage }));
    } else {
      queryQueue.current[routeId]
        .then(() => queryHandler(params))
        .then(data => ({ routeId, lastPageNumber: data.totalPage }));
    }

    return queryQueue.current[routeId];
  }

  function queryApiCall(params: QueryHandlerParams) {
    const { query, variables, pageNumber } = params;
    const routeId = getRouteId(getRouteByEndpoint(paginationQueryEndpoints, query), variables);
    return query({ ...variables, pageNumber })
      .then(data => {
        const routeSchema = dataToSchema(data.values);
        databaseObjectsContext.setObjectsFromBackendResponse(data.values);
        setRouteStorage(prevSate => ({
          ...prevSate,
          [routeId]: {
            lastPageNumber: data.totalPage,
            storage: [
              ...(lodashGet(prevSate, `${routeId}.storage`, []) as []),
              {
                pageNumber,
                schema: routeSchema,
              },
            ],
          },
        }));
        return data;
      })
      .finally(() => {
        queryQueue.current[routeId] = undefined;
      });
  }

  function getDataByRouteId(routeId: string) {
    const routeSchemas = routeStorage[routeId].storage.map(storage => storage.schema);
    const result = lodashContact(
      [],
      ...routeSchemas.map(schema =>
        isArray(schema) ? schema.map(nestedSchema => parseSchema(nestedSchema)) : parseSchema(schema),
      ),
    );
    return result;
  }

  function isRouteFetched(routeId: string, pageNumber: number) {
    return Boolean(routeStorage[routeId] && routeStorage[routeId].storage.find(item => item.pageNumber === pageNumber));
  }

  function refetchQueries(queries: QueryHandlerParams[]) {
    return Promise.all(queries.map(query => queryApiCall(query)));
  }

  return (
    <PaginationQueryContext.Provider value={{ queryHandler, refetchQueries, getDataByRouteId }}>
      {props.children}
    </PaginationQueryContext.Provider>
  );
}

export { PaginationQueryContextProvider };
