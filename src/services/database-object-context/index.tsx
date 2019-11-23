import * as React from 'react';
import { DatabaseObjectContext } from './context';
import { separatingObjectsContainingId } from '../utils';
import { DatabaseObjectContextProviderProps } from './helpers';
import { objectKeys } from '~/utils';

// [hooks] sonra bak buraya
function deepMergeIdObjects(cache: any, newData: any) {
  const modifiedData = {};
  objectKeys(newData).forEach(id => {
    modifiedData[id] = { ...cache[id], ...newData[id] };
  });

  return modifiedData;
}
function DatabaseObjectContextProvider(props: React.PropsWithChildren<DatabaseObjectContextProviderProps>) {
  const [databaseObjects, setDatabaseObjects] = React.useState({});
  const setObjects = React.useCallback((backendResponse: any) => {
    setDatabaseObjects(prev => ({
      ...prev,
      ...deepMergeIdObjects(prev, separatingObjectsContainingId(backendResponse)),
    }));
  }, []);
  const getObjects = React.useCallback(() => databaseObjects, [databaseObjects]);
  const contextValues = React.useMemo(() => ({ setObjectsFromBackendResponse: setObjects, getObjects }), [
    getObjects,
    setObjects,
  ]);

  return <DatabaseObjectContext.Provider value={contextValues}>{props.children}</DatabaseObjectContext.Provider>;
}

export { DatabaseObjectContextProvider };
