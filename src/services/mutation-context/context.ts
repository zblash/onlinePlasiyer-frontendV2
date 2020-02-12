import * as React from 'react';
import { MutationContextType, BaseEndpointType, UseMutationOptions, UseMutationResult } from './helpers';
import { EndpointsVariablesType } from '../helpers';
import { IExceptionResponse } from '../helpers/backend-models';

interface IStateType {
  data: any;
  error: IExceptionResponse;
  loading: boolean;
}

const initialValue: MutationContextType = {
  mutationHandler: () => Promise.resolve(0),
};

const MutationContext = React.createContext(initialValue);

const useMutationContext = () => React.useContext(MutationContext);

function useMutation<T extends BaseEndpointType>(
  mutationFunction: T,
  userOptions: UseMutationOptions<T> = {},
): UseMutationResult<T> {
  const mutationContext = useMutationContext();

  const [state, setState] = React.useState<IStateType>({ data: null, error: null, loading: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = React.useMemo(() => ({ variables: {}, ...userOptions }), [JSON.stringify(userOptions)]);
  const mutation = React.useCallback(
    (variables?: EndpointsVariablesType<T>) => {
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
          setState({ ...state, error: error.response.data, loading: false });
          throw error;
        });
    },
    [mutationContext, mutationFunction, options.refetchQueries, options.variables, state],
  );

  return React.useMemo(
    () => ({
      ...state,
      mutation,
    }),
    [mutation, state],
  );
}

export { MutationContext, useMutation };
