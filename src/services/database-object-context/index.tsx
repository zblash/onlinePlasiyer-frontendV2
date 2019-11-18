import * as React from 'react';
import { DatabaseObjectContext } from './context';
import { deepMergeIdObjects, separatingObjectsContainingId } from '../utils';
import { DatabaseObjectContextProviderProps } from './helpers';

function DatabaseObjectContextProvider(props: React.PropsWithChildren<DatabaseObjectContextProviderProps>) {
  const [databaseObjects, setDatabaseObjects] = React.useState({});

  function setObjects(backendResponse: any) {
    setDatabaseObjects(prev => ({
      ...prev,
      ...deepMergeIdObjects(prev, separatingObjectsContainingId(backendResponse)),
    }));
  }

  return (
    <DatabaseObjectContext.Provider value={{ setObjectsFromBackendResponse: setObjects, objects: databaseObjects }}>
      {props.children}
    </DatabaseObjectContext.Provider>
  );
}

const _DatabaseObjectContextProvider = DatabaseObjectContextProvider;

export { _DatabaseObjectContextProvider as DatabaseObjectContextProvider };
