import { QueryHandlerParams } from '../query-context/helpers';

export interface MutationContextProviderProps {}

export type MutationHandlerParams = {
  mutation: (vars: any) => Promise<any>;
  variables: any;
  refetchQueries?: QueryHandlerParams[];
};

export interface MutationContextType {
  mutationHandler: (params: MutationHandlerParams) => Promise<any>;
}
