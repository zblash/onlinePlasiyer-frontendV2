import * as React from 'react';
import { PaginationQueryContext } from './context';

interface PaginationQueryContextProviderProps {}

function PaginationQueryContextProvider(props: React.PropsWithChildren<PaginationQueryContextProviderProps>) {
  return <PaginationQueryContext.Provider value={{}}>{props.children}</PaginationQueryContext.Provider>;
}

export { PaginationQueryContextProvider };
