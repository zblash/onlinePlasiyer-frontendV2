import * as React from 'react';
import { QueryContextType, BaseQuery, UseQueryResult, UseQueryOptions } from './helpers';

const initialValue: QueryContextType = {
  queryHandler: () => Promise.resolve(''),
  refetchQueries: () => Promise.resolve(0),
  getDataByRouteId: () => null,
};

const QueryContext = React.createContext<QueryContextType>(initialValue);

function useQueryContext() {
  return React.useContext(QueryContext);
}

function useQuery<T extends BaseQuery>(query: T, options?: UseQueryOptions<T>): UseQueryResult<T> {
  const { defaultValue, onCompleted, skip, variables } = options;
  const queryContext = useQueryContext();
  const [state, setState] = React.useState({ routeId: null, error: null, loading: !skip, isCompleted: false });
  const getQuery = React.useCallback(() => {
    if (skip) {
      return;
    }
    setState({ ...state, loading: true, isCompleted: false });
    queryContext
      .queryHandler({
        query,
        variables: variables || {},
      })
      .then(routeId => {
        setState(prev => ({
          ...prev,
          routeId,
          loading: false,
          isCompleted: true,
        }));
      })
      .catch(e => {
        setState(prev => ({ ...prev, error: e, loading: false }));
        throw e;
      });
  }, [skip, variables, query, queryContext, state]);

  React.useEffect(() => {
    getQuery();
  }, [getQuery]);
  const data = React.useMemo(() => {
    if (state.routeId) {
      return queryContext.getDataByRouteId(state.routeId);
    }

    return defaultValue || null;
  }, [defaultValue, queryContext, state.routeId]);

  React.useEffect(() => {
    if (state.isCompleted && onCompleted) {
      onCompleted(data);
    }
  }, [data, onCompleted, state.isCompleted]);

  return {
    data,
    loading: state.loading,
    error: state.error,
  };
}

export { QueryContext, useQuery, useQueryContext };
