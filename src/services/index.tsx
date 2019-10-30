import * as React from 'react';
import { DatabaseObjectContextProvider } from './database-object-context';
import { MutationContextProvider } from './mutation-context';
import { QueryContextProvider } from './query-context';
import { PaginationQueryContextProvider } from './pagination-query-context';

interface ServicesContextProviderProps {}

function ServicesContextProvider(props: React.PropsWithChildren<ServicesContextProviderProps>) {
  return (
    <DatabaseObjectContextProvider>
      <QueryContextProvider>
        <PaginationQueryContextProvider>
          <MutationContextProvider>{props.children}</MutationContextProvider>
        </PaginationQueryContextProvider>
      </QueryContextProvider>
    </DatabaseObjectContextProvider>
  );
}

export { ServicesContextProvider };
