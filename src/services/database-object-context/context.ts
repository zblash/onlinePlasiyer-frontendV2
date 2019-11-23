import * as React from 'react';
import { DatabaseObjectsContextType } from './helpers';

const initialValue: DatabaseObjectsContextType = {
  setObjectsFromBackendResponse: () => {},
  getObjects: () => ({}),
  getObject: () => ({}),
};

const DatabaseObjectContext = React.createContext<DatabaseObjectsContextType>(initialValue);

function useDatabaseObjectsContext() {
  return React.useContext(DatabaseObjectContext);
}

export { DatabaseObjectContext, useDatabaseObjectsContext };
