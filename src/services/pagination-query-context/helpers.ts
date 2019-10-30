import { EndpointsResultType, QueryVariablesOptions, EndpointsVariablesType, EndpointGetter } from '../helpers';
import { paginationQueryEndpoints } from './pagination-query-endpoints';

export interface PaginationQueryContextType {
  queryHandler: (params: QueryHandlerParams) => Promise<string>;
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

export type BaseQuery = (vars: any) => Promise<any>;

export type UseQueryResult<Query> = {
  data: EndpointsResultType<Query>;
  loading: boolean;
  error: any;
};

export type UseQueryOptions<T> = {
  skip: boolean;
  defaultValue?: Partial<EndpointsResultType<T>>;
} & QueryVariablesOptions<EndpointsVariablesType<T>>;

export type PaginationQueryGetter = EndpointGetter<typeof paginationQueryEndpoints>;
