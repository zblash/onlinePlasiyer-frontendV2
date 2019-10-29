import * as React from 'react';
import { QueryContext } from './context';

interface QueryContextProviderProps {}

function QueryContextProvider(props: React.PropsWithChildren<QueryContextProviderProps>) {
  return <QueryContext.Provider value={{}}>{props.children}</QueryContext.Provider>;
}

export { QueryContextProvider };
