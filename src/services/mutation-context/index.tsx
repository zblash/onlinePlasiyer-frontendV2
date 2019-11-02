import * as React from 'react';
import { MutationContext } from './context';
import { MutationHandlerParams, MutationContextProviderProps } from './helpers';
import { useQueryContext } from '../query-context/context';
import { useDatabaseObjectsContext } from '../database-object-context/context';

function MutationContextProvider(props: React.PropsWithChildren<MutationContextProviderProps>) {
  const queryContext = useQueryContext();
  const databaseObjectsContext = useDatabaseObjectsContext();
  function mutationHandler({ mutation, variables, refetchQueries }: MutationHandlerParams) {
    return mutation(variables).then(mutationResult => {
      databaseObjectsContext.setObjectsFromBackendResponse(mutationResult);
      queryContext.refetchQueries(refetchQueries);

      return mutationResult;
    });
  }

  return <MutationContext.Provider value={{ mutationHandler }}>{props.children}</MutationContext.Provider>;
}

const _MutationContextProvider = MutationContextProvider;

export { _MutationContextProvider as MutationContextProvider };
