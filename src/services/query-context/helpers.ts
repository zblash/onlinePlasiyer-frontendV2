import { EndpointsResultType, QueryVariablesOptions, EndpointsVariablesType } from '../helpers';

export type QueryHandlerParams = {
  query: (vars: any) => Promise<any>;
  variables: any;
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
  skip?: boolean;
  defaultValue?: Partial<EndpointsResultType<T>>;
} & QueryVariablesOptions<EndpointsVariablesType<T>>;
