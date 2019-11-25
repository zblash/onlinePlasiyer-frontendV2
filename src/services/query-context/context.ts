import * as React from 'react';
import deepEqual from 'deep-equal';
import { QueryContextType, BaseQuery, UseQueryResult, UseQueryOptions } from './helpers';
import { useObjectState, usePrevious } from '~/utils/hooks';

const initialValue: QueryContextType = {
  queryHandler: () => Promise.resolve({ routeId: '', query: async () => {}, variables: {}, queryResult: {} }),
  refetchQueries: () => Promise.resolve(0),
  getDataByRouteId: () => null,
  staticDataParser: () => () =>
    Promise.resolve({
      queryResult: null,
      query: vars => Promise.resolve({} as any),
      variables: null,
      routeId: '',
    }) as any,
};

const QueryContext = React.createContext<QueryContextType>(initialValue);

function useQueryContext() {
  return React.useContext(QueryContext);
}

function useQuery<T extends BaseQuery>(query: T, userOptions?: UseQueryOptions<T>): UseQueryResult<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = React.useMemo(() => ({ variables: {}, ...userOptions }), [JSON.stringify(userOptions)]);
  const { queryHandler, getDataByRouteId } = useQueryContext();
  const [state, setState] = useObjectState({ routeId: null, error: null, loading: !options.skip, isCompleted: false });
  const prevOptions = usePrevious(options);
  const getQuery = React.useCallback(() => {
    if (options.skip) {
      return;
    }
    if (!deepEqual(prevOptions, options)) {
      setState({ loading: true, isCompleted: false });

      queryHandler({
        query,
        variables: options.variables,
      })
        .then(({ routeId }) => {
          setState({
            routeId,
            loading: false,
            isCompleted: true,
          });
        })
        .catch(e => {
          setState({ error: e, loading: false });
          throw e;
        });
    }
  }, [options, prevOptions, setState, queryHandler, query]);

  React.useEffect(() => {
    getQuery();
  }, [getQuery]);

  const data = React.useMemo(() => {
    if (state.routeId) {
      return getDataByRouteId(state.routeId);
    }

    return options.defaultValue || null;
  }, [getDataByRouteId, options.defaultValue, state.routeId]);

  return React.useMemo(
    () => ({
      data,
      loading: state.loading,
      error: state.error,
    }),
    [data, state.error, state.loading],
  );
}

export { QueryContext, useQuery, useQueryContext };
