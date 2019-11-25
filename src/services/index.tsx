import * as React from 'react';
import { DatabaseObjectContextProvider } from './database-object-context';
import { MutationContextProvider } from './mutation-context';
import { QueryContextProvider } from './query-context';
import { ApiCallContextProvider } from './api-call-context';

interface ServicesContextProviderProps {}

function ServicesContextProvider(props: React.PropsWithChildren<ServicesContextProviderProps>) {
  return (
    <ApiCallContextProvider>
      <DatabaseObjectContextProvider>
        <QueryContextProvider>
          <MutationContextProvider>{props.children}</MutationContextProvider>
        </QueryContextProvider>
      </DatabaseObjectContextProvider>
    </ApiCallContextProvider>
  );
}

export { ServicesContextProvider };
