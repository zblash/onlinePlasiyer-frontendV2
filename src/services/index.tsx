import * as React from 'react';
import { DatabaseObjectContextProvider } from './database-object-context/index';
import { MutationContextProvider } from './mutation-context/index';
import { QueryContextProvider } from './query-context/index';
import { ApiCallContextProvider } from './api-call-context/index';

interface ServicesContextProviderProps {}

function ServicesContextProvider(props: React.PropsWithChildren<ServicesContextProviderProps>) {
  return (
    <DatabaseObjectContextProvider>
      <ApiCallContextProvider>
        <QueryContextProvider>
          <MutationContextProvider>{props.children}</MutationContextProvider>
        </QueryContextProvider>
      </ApiCallContextProvider>
    </DatabaseObjectContextProvider>
  );
}

export { ServicesContextProvider };
