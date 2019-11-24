import * as React from 'react';
import deepEqual from 'deep-equal';
import { BasePaginationQuery, UsePaginationQueryOptions, UsePaginationQueryResult, PaginationResult } from './helpers';
import { useQueryContext } from './context';
import { useObjectState, usePrevious } from '~/utils/hooks';

function usePaginationQuery<T extends BasePaginationQuery>(
  query: T,
  userOptions: UsePaginationQueryOptions<T> = {},
): UsePaginationQueryResult<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = React.useMemo(() => ({ variables: { pageNumber: 1 }, ...userOptions }), [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(userOptions),
  ]);
  const prevOptions = usePrevious(options);
  const [state, setState] = useObjectState({
    routeIdsByPage: {},
    error: null,
    loading: !options.skip,
    isCompleted: false,
  });
  const { queryHandler, getDataByRouteId } = useQueryContext();
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
        .then(routeId => {
          setState({
            routeIdsByPage: { ...state.routeIdsByPage, [options.variables.pageNumber]: routeId },
            loading: false,
            isCompleted: true,
          });
        })
        .catch(e => {
          setState({ error: e, loading: false });
          throw e;
        });
    }
  }, [options, prevOptions, setState, queryHandler, query, state.routeIdsByPage]);
  React.useEffect(() => {
    getQuery();
  }, [getQuery]);

  const data = React.useMemo<PaginationResult<T>>(() => {
    const pages = Object.keys(state.routeIdsByPage).sort();
    if (pages.length > 0) {
      let baseObj: PaginationResult<T> = { values: [] } as any;
      pages.forEach(page => {
        const routeResult = getDataByRouteId(state.routeIdsByPage[page]);
        baseObj = { ...routeResult, values: [...baseObj.values, ...routeResult.values] };
      });

      return baseObj;
    }

    return (options.defaultValue || null) as any;
  }, [getDataByRouteId, options.defaultValue, state.routeIdsByPage]);

  const getDataByPage = React.useCallback(
    (pageNumber: number) => {
      const routeId = state.routeIdsByPage[pageNumber];
      if (routeId) {
        return getDataByRouteId(routeId);
      }

      return null;
    },
    [getDataByRouteId, state.routeIdsByPage],
  );

  return React.useMemo<UsePaginationQueryResult<T>>(
    () => ({
      data,
      error: state.error,
      loading: state.loading,
      getDataByPage,
    }),
    [data, getDataByPage, state.error, state.loading],
  );
}

export { usePaginationQuery };
