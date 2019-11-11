import { EndpointsResultType, EndpointsVariablesType } from '../helpers';
import { paginationQueryEndpoints } from './pagination-query-endpoints';

export interface PaginationQueryContextType {
  queryHandler: (
    params: QueryHandlerParams,
  ) => Promise<{ routeId: string; lastPageNumber: number; elementCountOfPage: number }>;
  refetchQueries: (params: QueryHandlerParams[]) => Promise<any>;
  getDataByRouteId: (id: string) => any;
}

export interface PaginationResult<DataType> {
  first: boolean;
  last: boolean;
  nextPage: number;
  previusPageIndex: number;
  values: DataType[];
  totalElements: number;
  totalPage: number;
}

export type QueryHandlerParams = {
  query: (vars: any) => Promise<any>;
  variables: any;
  pageNumber: number;
};

export interface QueryContextType {
  queryHandler: (params: QueryHandlerParams) => Promise<string>;
  refetchQueries: (params: QueryHandlerParams[]) => Promise<any>;
  getDataByRouteId: (id: string) => any;
}

export type BasePaginationQuery = typeof paginationQueryEndpoints[keyof typeof paginationQueryEndpoints];

export type UsePaginationQueryResult<Query> = {
  // @ts-ignore
  data: EndpointsResultType<Query>['values'];
  loading: boolean;
  error: any;
  isDone: boolean;
  next: () => void;
  currentPage: number;
  elementCountOfPage: number;
};

export type UsePaginationQueryOptions<T> = {
  skip?: boolean;
  // @ts-ignore
  defaultValue?: Partial<EndpointsResultType<T>['values']>;
  variables?: Omit<EndpointsVariablesType<T>, 'pageNumber'>;
};
