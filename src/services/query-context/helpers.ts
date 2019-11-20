import { EndpointsResultType, EndpointsVariablesType } from '../helpers';
import { queryEndpoints } from './query-endpoints';
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
  onCompleted?: (d: EndpointsResultType<T>) => void;
};
