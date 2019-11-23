import * as React from 'react';
import {
  PaginationQueryContextType,
  BasePaginationQuery,
  UsePaginationQueryResult,
  UsePaginationQueryOptions,
} from './helpers';
import { useObjectState } from '~/utils/hooks';

const initialValue: PaginationQueryContextType = {
  getDataByRouteId: () => null,
  refetchQueries: () => Promise.resolve(0),
  queryHandler: () => Promise.resolve({ routeId: '', lastPageNumber: 0, elementCountOfPage: 0 }),
};

const PaginationQueryContext = React.createContext(initialValue);

const usePaginationQueryContext = () => React.useContext(PaginationQueryContext);

function usePaginationQuery<T extends BasePaginationQuery>(
  query: T,
  options: UsePaginationQueryOptions<T> = {},
): UsePaginationQueryResult<T> {
  const { queryHandler, getDataByRouteId } = usePaginationQueryContext();
  const [state, setState] = useObjectState({
    routeId: null,
    error: null,
    elementCountOfPage: 0,
    loading: !options.skip,
    isCompleted: false,
    pageNumber: options.pageNumber || 1,
    lastPage: 1,
  });

  const data = React.useMemo(() => {
    if (state.routeId) {
      return getDataByRouteId(state.routeId);
    }

    return options.defaultValue || null;
  }, [getDataByRouteId, options.defaultValue, state.routeId]);

  const getQuery = React.useCallback(() => {
    if (options.skip) {
      return;
    }
    setState({ loading: true });
    queryHandler({
      query,
      variables: options.variables || {},
      pageNumber: state.pageNumber,
    })
      .then(({ routeId, lastPageNumber, elementCountOfPage }) => {
        setState({
          routeId,
          elementCountOfPage,
          lastPage: lastPageNumber,
          loading: false,
          isCompleted: true,
        });
      })
      .catch(e => {
        setState({ error: e, loading: false });
        throw e;
      });
  }, [options.skip, options.variables, query, queryHandler, setState, state.pageNumber]);

  React.useEffect(() => {
    if (state.pageNumber === 1) {
      getQuery();
    } else {
      setState({ pageNumber: 1 });
    }
  }, [getQuery, setState, state.pageNumber]);

  React.useEffect(() => {
    getQuery();
  }, [getQuery, state.pageNumber]);

  React.useEffect(() => {
    if (options.pageNumber) {
      setState({ pageNumber: options.pageNumber });
    }
  }, [options.pageNumber, setState]);

  return React.useMemo(
    () => ({
      elementCountOfPage: state.elementCountOfPage,
      data,
      currentPage: state.pageNumber,
      loading: state.loading,
      lastPage: state.lastPage,
      error: state.error,
      isDone: state.pageNumber === state.lastPage && !!state.routeId,
      next: () => {
        const nextPage = state.pageNumber + 1;
        if (nextPage <= state.lastPage) {
          setState({ pageNumber: state.pageNumber + 1 });
        }
      },
    }),
    [
      data,
      setState,
      state.elementCountOfPage,
      state.error,
      state.lastPage,
      state.loading,
      state.pageNumber,
      state.routeId,
    ],
  );
}

export { PaginationQueryContext, usePaginationQuery, usePaginationQueryContext };
