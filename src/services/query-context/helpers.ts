import { EndpointsResultType, EndpointsVariablesType } from '../helpers';
import { queryEndpoints } from './query-endpoints';
import { paginationQueryEndpoints } from './pagination-query-endpoints';
import { RefetchQuery } from '../mutation-context/helpers';

interface PaginationQueryRequiredVariables {
  pageNumber: number;
}

export type QueryHandlerParams<T = (v?: any) => Promise<any>> = {
  query: (vars: EndpointsVariablesType<T>) => Promise<EndpointsResultType<T>>;
  variables: EndpointsVariablesType<T>;
  paginationVariables?: PaginationQueryRequiredVariables;
};

export interface QueryContextType {
  queryHandler: (params: QueryHandlerParams) => Promise<{ routeId: string; queryResult: any } & QueryHandlerParams>;
  refetchQueries: (params: RefetchQuery[], mutationResult: any) => Promise<any>;
  getDataByRouteId: (id: string) => any;
  staticDataParser: (
    params: QueryHandlerParams<(v?: any) => Promise<any>>,
  ) => (
    data: any,
  ) => {
    queryResult: any;
    query: (vars: any) => Promise<any>;
    variables: any;
    paginationVariables?: PaginationQueryRequiredVariables;
    routeId: string;
  };
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

export interface PaginationResult<Q> {
  first: boolean;
  last: boolean;
  nextPage: number;
  previusPageIndex: number;
  values: (EndpointsResultType<Q> & { pageIndex: number })[];
  totalElements: number;
  totalPage: number;
  elementCountOfPage: number;
}

export type BasePaginationQuery = typeof paginationQueryEndpoints[keyof typeof paginationQueryEndpoints];

export type UsePaginationQueryResult<T> = {
  loading: boolean;
  getDataByPage: (pageNumber: number) => PaginationResult<T>;
  data: PaginationResult<T>;
  error: any;
};

export type UsePaginationQueryOptions<T> = PaginationQueryRequiredVariables & {
  skip?: boolean;
  // eslint-disable-next-line  @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  defaultValue?: Partial<PaginationResult<T>>;
  variables?: Omit<EndpointsVariablesType<T>, 'pageNumber'>;
};
