import * as React from 'react';
import lodashContact from 'lodash.concat';
import deepEqual from 'deep-equal';
import { BasePaginationQuery, UsePaginationQueryOptions, UsePaginationQueryResult, PaginationResult } from './helpers';
import { useQueryContext } from './context';
import { useObjectState, usePrevious } from '~/utils/hooks';
import { EndpointsResultType } from '../helpers';

function usePaginationQuery<T extends BasePaginationQuery>(
  query: T,
  userOptions: UsePaginationQueryOptions<T> = {},
): UsePaginationQueryResult<EndpointsResultType<T>> {
  const { queryHandler, getDataByRouteId } = useQueryContext();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = React.useMemo(() => ({ variables: { pageNumber: 1 }, ...userOptions }), [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(userOptions),
  ]);
  const prevOptions = usePrevious(options);
  const [state, setState] = useObjectState({
    routeId: null,
    error: null,
    loading: !options.skip,
    isCompleted: false,
    allPageRoutes: [],
  });

  const paginatedData = React.useMemo<PaginationResult<EndpointsResultType<T>>>(() => {
    if (state.routeId) {
      return getDataByRouteId(state.routeId);
    }

    return {
      totalPage: 0,
      totalElements: 0,
      first: false,
      last: false,
      nextPage: 0,
      previusPageIndex: 0,
      values: [],
    };
  }, [getDataByRouteId, state.routeId]);
  const allData = React.useMemo<PaginationResult<EndpointsResultType<T>>['values']>(() => {
    if (state.allPageRoutes.length > 0) {
      const result = lodashContact([], ...state.allPageRoutes.map(item => getDataByRouteId(item).values));
      console.log(result.length);
      return result;
    }

    return [];
  }, [getDataByRouteId, state]);

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
            routeId,
            allPageRoutes: [...state.allPageRoutes, routeId],
            loading: false,
            isCompleted: true,
          });
        })
        .catch(e => {
          setState({ error: e, loading: false });
          throw e;
        });
    }
  }, [options, prevOptions, query, queryHandler, state, setState]);

  React.useEffect(() => {
    getQuery();
  }, [getQuery]);

  // @ts-ignore
  return React.useMemo<UsePaginationQueryResult<EndpointsResultType<T>>>(() => {
    return {
      error: state.error,
      loading: state.loading,
      isDone: options.variables.pageNumber === paginatedData.totalPage,
      // @ts-ignore
      data: allData || options.defaultValue,
      values: paginatedData.values || options.defaultValue,
      ...paginatedData,
    };
  }, [state.error, state.loading, options.variables.pageNumber, options.defaultValue, paginatedData, allData]);
}

export { usePaginationQuery };
