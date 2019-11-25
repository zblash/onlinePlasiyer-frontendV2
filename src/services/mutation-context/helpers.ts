import { EndpointsVariablesType, EndpointsResultType } from '../helpers';

export interface MutationContextProviderProps {}

export interface RefetchQuery<T = any> {
  query: (vars: EndpointsVariablesType<T>) => Promise<EndpointsResultType<T>>;
  variables: Omit<EndpointsVariablesType<T>, 'pageNumber'>;
  type: 'normal' | 'pagination' | 'chain';
}

export type MutationHandlerParams = {
  mutation: (vars: any) => Promise<any>;
  variables: any;
  refetchQueries?: RefetchQuery[];
};

export interface MutationContextType {
  mutationHandler: (params: MutationHandlerParams) => Promise<any>;
}

export type BaseEndpointType = (vars: any) => Promise<any>;

export type UseMutationResult<Mutation> = {
  mutation: (vars?: EndpointsVariablesType<Mutation>) => Promise<EndpointsResultType<Mutation>>;
  loading: boolean;
  error: any;
  data: EndpointsResultType<Mutation>;
};

export type UseMutationOptions<T> = {
  refetchQueries?: RefetchQuery[];
  variables?: EndpointsVariablesType<T>;
};
