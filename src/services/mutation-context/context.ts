import * as React from 'react';
import { MutationContextType, BaseEndpointType, UseMutationOptions, UseMutationResult } from './helpers';
import { EndpointsVariablesType } from '../helpers';

const initialValue: MutationContextType = {
  mutationHandler: () => Promise.resolve(0),
};

const MutationContext = React.createContext(initialValue);

const useMutationContext = () => React.useContext(MutationContext);

function useMutation<T extends BaseEndpointType>(
  mutationFunction: T,
  options: UseMutationOptions<T> = {},
): UseMutationResult<T> {
  const mutationContext = useMutationContext();
  const [state, setState] = React.useState({ data: null, error: null, loading: false });
  function mutation(variables?: EndpointsVariablesType<T>) {
    setState({ ...state, error: null, loading: true });

    return mutationContext
      .mutationHandler({
        mutation: mutationFunction,
        variables: { ...options.variables, ...variables },
        refetchQueries: options.refetchQueries,
      })
      .then(data => {
        setState({
          loading: false,
          data,
          error: null,
        });

        return data;
      })
      .catch(error => {
        setState({ ...state, error, loading: false });
        throw error;
      });
  }

  return {
    ...state,
    mutation,
  };
}

export { MutationContext, useMutation };
