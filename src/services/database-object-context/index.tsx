import * as React from 'react';
import { DatabaseObjectContext } from './context';
import { CrudeDatabaseObject } from './helpers';

/*
  DatabaseObjectContextProvider Helpers
*/
interface DatabaseObjectContextProviderProps {}

function DatabaseObjectContextProvider(props: React.PropsWithChildren<DatabaseObjectContextProviderProps>) {
  const [objects, setObject] = React.useState({});
  /*
  DatabaseObjectContextProvider Functions
  */
  function addOrUpdate(object: CrudeDatabaseObject) {
    const prerecordedObject = objects[object.id];
    if (prerecordedObject) {
      setObject({ ...objects, [object.id]: { ...prerecordedObject, ...object } });
    } else {
      setObject({ ...objects, [object.id]: object });
    }
  }

  return (
    <DatabaseObjectContext.Provider value={{ addOrUpdate, objects }}>{props.children}</DatabaseObjectContext.Provider>
  );
}

const _DatabaseObjectContextProvider = DatabaseObjectContextProvider;

export { _DatabaseObjectContextProvider as DatabaseObjectContextProvider };
