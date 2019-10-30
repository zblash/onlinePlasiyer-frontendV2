import * as React from 'react';
import { PaginationQueryContextType, PaginationQueryGetter } from './helpers';
import { paginationQueryEndpoints } from './pagination-query-endpoints';

const initialValue: PaginationQueryContextType = {
  getDataByRouteId: () => null,
  refetchQueries: () => Promise.resolve(0),
  queryHandler: () => Promise.resolve(''),
};

const PaginationQueryContext = React.createContext(initialValue);

const usePaginationQueryContext = () => React.useContext(PaginationQueryContext);

function usePaginationQuery(queryGetter: PaginationQueryGetter) {
  const paginationQueryContext = usePaginationQueryContext();
  const query = queryGetter(paginationQueryEndpoints);
}

export { PaginationQueryContext, usePaginationQuery, usePaginationQueryContext };
