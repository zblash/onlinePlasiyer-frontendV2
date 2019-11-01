import { EndpointsResultType, EndpointsVariablesType } from '../helpers';
import { queryEndpoints } from './query-endpoints';

export type QueryHandlerParams = {
  query: (vars: any) => Promise<any>;
  variables: any;
};
export interface QueryContextType {
  queryHandler: (params: QueryHandlerParams) => Promise<string>;
  refetchQueries: (params: QueryHandlerParams[]) => Promise<any>;
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
