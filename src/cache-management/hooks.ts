import * as React from 'react';
import { EndpointsResultType, EndpointsVariablesType, GenericQuery, FetchPolicy } from './helpers';
import { CacheContext } from './context';
import { WithDefaultProps } from '~/helpers';

type CommonOptions<T> = EndpointsVariablesType<T> extends undefined
  ? {
      variables?: EndpointsVariablesType<T>;
    }
  : {
      variables: EndpointsVariablesType<T>;
    };

// [mutation,result,loading,error]
type UseMutationResult<Mutation> = [
  () => Promise<EndpointsResultType<Mutation>>,
  EndpointsResultType<Mutation>,
  boolean,
  any,
];

type UseMutationOptions<T> = {
  refetchQueries?: GenericQuery[];
} & CommonOptions<T>;

type BaseEndpointType = (vars: any) => Promise<any>;

function useMutation<T extends BaseEndpointType>(mutation: T, options?: UseMutationOptions<T>): UseMutationResult<T> {
  const cacheContext = React.useContext(CacheContext);
  const [state, setState] = React.useState({ data: null, error: null, loading: false });
  function mutate() {
    setState({ ...state, error: null, loading: true });

    return cacheContext
      .mutate({
        mutation,
        variables: options.variables,
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

  return [mutate, state.data, state.loading, state.error];
}

// [queryResult,loading,error]
type UseQueryResult<Query> = [EndpointsResultType<Query>, boolean, any];

type UseQueryOptions<T> = {
  name?: string;
  fetchPolicy: FetchPolicy;
  skip: boolean;
  onCompleted: (data: EndpointsResultType<T>) => void;
  onError: (e: any) => void;
} & CommonOptions<T>;

const defaultQueryOptions = {
  fetchPolicy: 'cache-first' as FetchPolicy,
  skip: false,
  onCompleted: () => {},
  onError: () => {},
};

function useQuery<T extends BaseEndpointType>(
  query: T,
  _options?: WithDefaultProps<typeof defaultQueryOptions, UseQueryOptions<T>>,
): UseQueryResult<T> {
  const cacheContext = React.useContext(CacheContext);
  const queryHookId = React.useRef(`${Math.random()}`).current;
  const options = { ...defaultQueryOptions, ..._options };
  const [state, setState] = React.useState({ data: null, error: null, loading: !options.skip });

  React.useEffect(() => {
    getQuery();
  }, [JSON.stringify(options.variables), options.skip]);

  React.useEffect(() => {
    getQuery();

    return () => {
      cacheContext.removeListener(queryHookId);
    };
  }, []);

  function getQuery() {
    if (options.skip) {
      return;
    }
    setState({ ...state, loading: true });
    cacheContext
      .get({
        query,
        fetchPolicy: options.fetchPolicy,
        variables: options.variables || {},
        listener: {
          id: queryHookId,
          onDataChange: data => {
            setState({
              loading: false,
              data,
              error: data ? null : state.error,
            });
          },
        },
      })
      .then(data => {
        setState({
          ...state,
          loading: false,
          data,
        });
        options.onCompleted(data);
      })
      .catch(e => {
        setState({ ...state, error: e, loading: false });
        options.onError(e);
        throw e;
      });
  }

  return [state.data, state.loading, state.error];
}

export { useMutation, useQuery };
