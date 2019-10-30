import * as React from 'react';
import { QueryContextType, BaseQuery, UseQueryResult, UseQueryOptions } from './helpers';

const initialValue: QueryContextType = {
  queryHandler: () => Promise.resolve(''),
  refetchQueries: () => Promise.resolve(0),
  getDataByRouteId: () => null,
};

const QueryContext = React.createContext(initialValue);

function useQueryContext() {
  return React.useContext(QueryContext);
}

function useQuery<T extends BaseQuery>(query: T, _options?: UseQueryOptions<T>): UseQueryResult<T> {
  const queryContext = useQueryContext();
  const options = { skip: false, ..._options };
  const [state, setState] = React.useState({ routeId: null, error: null, loading: !options.skip, isCompleted: false });

  function getQuery() {
    if (options.skip) {
      return;
    }
    setState({ ...state, loading: true });
    queryContext
      .queryHandler({
        query,
        variables: options.variables || {},
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
  }

  React.useEffect(() => {
    getQuery();
  }, [JSON.stringify(options)]);

  function dataGetter() {
    if (state.routeId) {
      return queryContext.getDataByRouteId(state.routeId);
    }
    return options.defaultValue || null;
  }

  return {
    data: dataGetter(),
    loading: state.loading,
    error: state.error,
  };
}

export { QueryContext, useQuery, useQueryContext };
