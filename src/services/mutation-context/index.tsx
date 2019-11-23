import * as React from 'react';
import { MutationContext } from './context';
import { MutationHandlerParams, MutationContextProviderProps, RefetchQuery } from './helpers';
import { useQueryContext } from '../query-context/context';
import { useDatabaseObjectsContext } from '../database-object-context/context';
import { usePaginationQueryContext } from '../pagination-query-context/context';
import { asyncMap } from '~/utils';

function MutationContextProvider(props: React.PropsWithChildren<MutationContextProviderProps>) {
  const queryContext = useQueryContext();
  const paginationQueryContext = usePaginationQueryContext();
  const databaseObjectsContext = useDatabaseObjectsContext();
  const refetchQueriesHandler = React.useCallback(
    (refetchQueries: RefetchQuery[] = []) => {
      const normalRefetchQueries = refetchQueries.filter(t => t.type === 'normal');
      const paginationRefetchQueries = refetchQueries.filter(t => t.type === 'pagination');
      asyncMap([
        () => {
          const a = queryContext.refetchQueries(normalRefetchQueries);

          return a;
        },
        () => {
          const b = paginationQueryContext.refetchQueries(paginationRefetchQueries);

          return b;
        },
      ]);
    },
    [paginationQueryContext, queryContext],
  );

  const mutationHandler = React.useCallback(
    ({ mutation, variables, refetchQueries }: MutationHandlerParams) => {
      return mutation(variables).then(mutationResult => {
        databaseObjectsContext.setObjectsFromBackendResponse(mutationResult);
        refetchQueriesHandler(refetchQueries);

        return mutationResult;
      });
    },
    [databaseObjectsContext, refetchQueriesHandler],
  );

  const contextValues = React.useMemo(() => ({ mutationHandler }), [mutationHandler]);

  return <MutationContext.Provider value={contextValues}>{props.children}</MutationContext.Provider>;
}

const _MutationContextProvider = MutationContextProvider;

export { _MutationContextProvider as MutationContextProvider };
