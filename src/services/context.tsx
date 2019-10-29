import * as React from 'react';
import {
  EndpointsResultType,
  GenericQuery,
  FetchPolicy,
  CommonEnpointOptions,
  EndpointsVariablesType,
  ServicesContextValues,
} from '~/services/helpers';
import { WithDefaultProps } from '~/helpers';
import { useServicesContext } from '~/utils/hooks';

// [mutation,loading,error,result]
type UseMutationResult<Mutation> = [
  (vars?: EndpointsVariablesType<Mutation>) => Promise<EndpointsResultType<Mutation>>,
  boolean,
  any,
  EndpointsResultType<Mutation>,
];

type UseMutationOptions<T> = {
  refetchQueries?: GenericQuery[];
  variables?: EndpointsVariablesType<T>;
};

type BaseEndpointType = (vars: any) => Promise<any>;

const ServicesContext = React.createContext<ServicesContextValues>({
  get: () => Promise.resolve(),
  mutate: () => Promise.resolve(),
  removeListener: () => {},
});

function useMutation<T extends BaseEndpointType>(mutation: T, _options?: UseMutationOptions<T>): UseMutationResult<T> {
  const cacheContext = useServicesContext();
  const options = { ..._options };
  const [state, setState] = React.useState({ data: null, error: null, loading: false });
  function mutate(variables?: EndpointsVariablesType<T>) {
    setState({ ...state, error: null, loading: true });

    return cacheContext
      .mutate({
        mutation,
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

  return [mutate, state.loading, state.error, state.data];
}

type UseQueryResult<Query> = {
  data: EndpointsResultType<Query>;
  loading: boolean;
  error: any;
};

type UseQueryOptions<T> = {
  fetchPolicy: FetchPolicy;
  skip: boolean;
  onCompleted: (data: EndpointsResultType<T>) => void;
  onError: (e: any) => void;
  defaultValue?: EndpointsResultType<T>;
} & CommonEnpointOptions<T>;

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
  const cacheContext = useServicesContext();
  const queryHookId = React.useRef(`${Math.random()}`).current;
  const options = { ...defaultQueryOptions, ..._options };
  const [state, setState] = React.useState({ data: null, error: null, loading: !options.skip });

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

  React.useEffect(() => {
    getQuery();

    return () => {
      cacheContext.removeListener(queryHookId);
    };
  }, [JSON.stringify(options)]);

  return {
    data: state.data || options.defaultValue,
    loading: state.loading,
    error: state.error,
  };
}

type UsePaginationQueryResult<Query> = {
  data: EndpointsResultType<Query>;
  loading: boolean;
  error: any;
  pagination: {
    next: () => void;
    prev: () => void;
  };
};

type UsePaginationQueryOptions<T> = {
  fetchPolicy: FetchPolicy;
  skip: boolean;
  onCompleted: (data: EndpointsResultType<T>) => void;
  onError: (e: any) => void;
  isPaginated: boolean;
  defaultValue?: EndpointsResultType<T>;
  variables?: Omit<EndpointsVariablesType<T>, 'pageNumber'>;
};

function usePaginatedQuery<T extends BaseEndpointType>(
  query: T,
  _options: UsePaginationQueryOptions<T>,
): UsePaginationQueryResult<T> {
  const [pageNumber, setPageNumber] = React.useState(1);
}

export { useMutation, useQuery, ServicesContext };
