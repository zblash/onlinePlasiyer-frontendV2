import * as React from 'react';
import { DatabaseObjectContext } from './context';
import { DatabaseObjectContextProviderProps } from './helpers';
import { useObjectState } from '~/utils/hooks';
import { deepMergeIdObjects } from '../utils/index';

function DatabaseObjectContextProvider(props: React.PropsWithChildren<DatabaseObjectContextProviderProps>) {
  const [databaseObjects, setDatabaseObjects] = useObjectState({});
  const setObjects = React.useCallback(
    (seperatedData: any) => {
      setDatabaseObjects(deepMergeIdObjects(databaseObjects, seperatedData));
    },
    [databaseObjects, setDatabaseObjects],
  );
  const getObjects = React.useCallback(() => databaseObjects, [databaseObjects]);
  const getObject = React.useCallback((id: string) => databaseObjects[id], [databaseObjects]);
  const contextValues = React.useMemo(() => ({ setObjectsFromBackendResponse: setObjects, getObjects, getObject }), [
    getObjects,
    setObjects,
    getObject,
  ]);

  return <DatabaseObjectContext.Provider value={contextValues}>{props.children}</DatabaseObjectContext.Provider>;
}

export { DatabaseObjectContextProvider };
