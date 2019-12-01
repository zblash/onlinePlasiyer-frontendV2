import * as React from 'react';
import lodashOmit from 'lodash.omit';
import lodashSortBy from 'lodash.sortby';
import deepEqual from 'deep-equal';
import { BasePaginationQuery, UsePaginationQueryOptions, UsePaginationQueryResult, PaginationResult } from './helpers';
import { useQueryContext } from './context';
import { useObjectState, usePrevious } from '~/utils/hooks';
import { objectValues, narrowObject } from '~/utils';
import { getRouteId } from '../utils';

function initialState<T>(
  options: any,
  defaultValue: any = {},
): {
  routeIdsByPage: Record<string, { routeId: string; pageNumber: string }>;
  error: any;
  loading: boolean;
  isCompleted: boolean;
  routeIdWithOutPageNumber: string;
  totalPage: number;
  mergedValues: PaginationResult<T>;
} {
  return {
    routeIdsByPage: {},
    error: null,
    loading: !options.skip,
    isCompleted: false,
    routeIdWithOutPageNumber: null,
    totalPage: 0,
    mergedValues: null,
    ...defaultValue,
  };
}
function usePaginationQuery<T extends BasePaginationQuery>(
  query: T,
  userOptions: UsePaginationQueryOptions<T> = { pageNumber: 1 },
): UsePaginationQueryResult<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = React.useMemo(() => ({ variables: {}, ...userOptions }), [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    narrowObject(userOptions, true),
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optionsWithOutPageNumber = React.useMemo(() => ({ variables: {}, ...userOptions }), [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    narrowObject(lodashOmit(userOptions, 'pageNumber'), true),
  ]);
  const prevOptions = usePrevious(options);
  const [state, setState] = useObjectState(initialState(options));
  const { queryHandler, getDataByRouteId } = useQueryContext();

  React.useEffect(() => {
    setState(initialState(optionsWithOutPageNumber), true);
  }, [optionsWithOutPageNumber, setState]);

  const getQuery = React.useCallback(() => {
    if (options.skip) {
      return;
    }
    if (!deepEqual(prevOptions, options)) {
      setState({ loading: true, isCompleted: false });

      queryHandler({
        query,
        variables: options.variables,
        paginationVariables: { pageNumber: options.pageNumber },
      })
        .then(({ routeId, variables, queryResult }) => {
          const routeIdWithOutPageNumber = getRouteId(query, lodashOmit(variables, 'pageNumber'));
          let routeIdsByPage = {
            [options.pageNumber + routeId]: {
              routeId,
              pageNumber: options.pageNumber.toString(),
            },
          };
          if (!state.routeIdWithOutPageNumber || state.routeIdWithOutPageNumber === routeIdWithOutPageNumber) {
            routeIdsByPage = {
              ...state.routeIdsByPage,
              ...routeIdsByPage,
            };
          }
          setState({
            routeIdsByPage,
            routeIdWithOutPageNumber,
            loading: false,
            totalPage: queryResult.totalPage,
            isCompleted: true,
          });
        })
        .catch(e => {
          setState({ error: e, loading: false });
          throw e;
        });
    }
  }, [options, prevOptions, setState, queryHandler, query, state.routeIdWithOutPageNumber, state.routeIdsByPage]);

  const data = React.useMemo<PaginationResult<T>>(() => {
    if (state.mergedValues) {
      return state.mergedValues;
    }

    return (options.defaultValue || null) as any;
  }, [options.defaultValue, state.mergedValues]);

  const getDataByPage = React.useCallback(
    (pageNumber: number) => {
      const routeId = objectValues(state.routeIdsByPage).find(
        item => item && item.pageNumber === pageNumber.toString(),
      );
      if (routeId) {
        return getDataByRouteId(routeId.routeId);
      }

      return { ...options.defaultValue, totalPage: state.totalPage };
    },
    [getDataByRouteId, options.defaultValue, state.routeIdsByPage, state.totalPage],
  );

  React.useEffect(() => {
    getQuery();
  }, [getQuery]);

  React.useEffect(() => {
    const prevState = state.mergedValues;
    const pages = lodashSortBy(objectValues(state.routeIdsByPage), 'pageNumber');
    if (pages.length > 0) {
      let baseObj: PaginationResult<T> = { values: [] } as any;
      pages.forEach(page => {
        const routeResult = getDataByRouteId(page.routeId);
        baseObj = { ...routeResult, values: lodashSortBy([...baseObj.values, ...routeResult.values], 'pageIndex') };
      });
      if (!deepEqual(prevState, baseObj)) {
        setState({ mergedValues: baseObj });
      }
    }
  }, [getDataByRouteId, options.defaultValue, setState, state.mergedValues, state.routeIdsByPage]);

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
