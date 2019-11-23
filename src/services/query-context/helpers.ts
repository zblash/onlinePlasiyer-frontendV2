import { EndpointsResultType, EndpointsVariablesType } from '../helpers';
import { queryEndpoints } from './query-endpoints';
import { paginationQueryEndpoints } from './pagination-query-endpoints';
import { RefetchQuery } from '../mutation-context/helpers';

export type QueryHandlerParams<T = (v?: any) => Promise<any>> = {
  query: (vars: EndpointsVariablesType<T>) => Promise<EndpointsResultType<T>>;
  variables: EndpointsVariablesType<T>;
};

export interface QueryContextType {
  queryHandler: (params: QueryHandlerParams) => Promise<string>;
  refetchQueries: (params: RefetchQuery[]) => Promise<any>;
  getDataByRouteId: (id: string) => any;
}

export type BaseQuery = typeof queryEndpoints[keyof typeof queryEndpoints];

export type UseQueryResult<Query> = {
  data: EndpointsResultType<Query>;
  loading: boolean;
  error: any;
};

export type UseQueryOptions<T> = {
  skip?: boolean;
  defaultValue?: Partial<EndpointsResultType<T>>;
  variables?: EndpointsVariablesType<T>;
};

export interface PaginationQueryContextType {
  queryHandler: (
    params: QueryHandlerParams,
  ) => Promise<{ routeId: string; lastPageNumber: number; elementCountOfPage: number }>;
  refetchQueries: (params: RefetchQuery[]) => Promise<any>;
  getDataByRouteId: (id: string) => any;
}

export interface PaginationResult<DataType> {
  first: boolean;
  last: boolean;
  nextPage: number;
  previusPageIndex: number;
  values: (DataType & { pageIndex: number })[];
  totalElements: number;
  totalPage: number;
}

export type BasePaginationQuery = typeof paginationQueryEndpoints[keyof typeof paginationQueryEndpoints];

export type UsePaginationQueryResult<T> = PaginationResult<T> & {
  // eslint-disable-next-line  @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  loading: boolean;
  error: any;
  isDone: boolean;
  next: () => void;
};

export type UsePaginationQueryOptions<T> = {
  skip?: boolean;
  // eslint-disable-next-line  @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  defaultValue?: Partial<EndpointsResultType<T>['values']>;
  variables?: EndpointsVariablesType<T>;
};
