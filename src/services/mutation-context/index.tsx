import * as React from 'react';
import { MutationContext } from './context';

/*
  MutationContextProvider Helpers
*/
interface MutationContextProviderProps {}

function MutationContextProvider(props: React.PropsWithChildren<MutationContextProviderProps>) {
  return <MutationContext.Provider value={{}}>{props.children}</MutationContext.Provider>;
}

const _MutationContextProvider = MutationContextProvider;

export { _MutationContextProvider as MutationContextProvider };
