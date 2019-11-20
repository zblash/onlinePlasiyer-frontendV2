import * as React from 'react';
import {
  PaginationQueryContextType,
  BasePaginationQuery,
  UsePaginationQueryResult,
  UsePaginationQueryOptions,
} from './helpers';

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
  const paginationQueryContext = usePaginationQueryContext();
  const [state, setState] = React.useState({
    routeId: null,
    error: null,
    elementCountOfPage: 0,
    loading: !options.skip,
    isCompleted: false,
    pageNumber: 1,
    lastPageNumber: 1,
  });
  function getQuery() {
    if (options.skip) {
      return;
    }
    setState({ ...state, loading: true });
    paginationQueryContext
      .queryHandler({
        query,
        variables: options.variables || {},
        pageNumber: state.pageNumber,
      })
      .then(({ routeId, lastPageNumber, elementCountOfPage }) => {
        setState(prev => ({
          ...prev,
          routeId,
          elementCountOfPage,
          lastPageNumber,
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
    if (state.pageNumber === 1) {
      getQuery();
    } else {
      setState(prev => ({ ...prev, pageNumber: 1 }));
    }
  }, [JSON.stringify(options)]);

  React.useEffect(() => {
    getQuery();
  }, [state.pageNumber]);

  function dataGetter() {
    if (state.routeId) {
      return paginationQueryContext.getDataByRouteId(state.routeId);
    }

    return options.defaultValue || null;
  }

  return {
    elementCountOfPage: state.elementCountOfPage,
    data: dataGetter(),
    currentPage: state.pageNumber,
    loading: state.loading,
    error: state.error,
    isDone: state.pageNumber === state.lastPageNumber && !!state.routeId,
    next: () => {
      const nextPage = state.pageNumber + 1;
      if (nextPage <= state.lastPageNumber) {
        setState(prev => ({ ...prev, pageNumber: state.pageNumber + 1 }));
      }
    },
  };
}

export { PaginationQueryContext, usePaginationQuery, usePaginationQueryContext };
