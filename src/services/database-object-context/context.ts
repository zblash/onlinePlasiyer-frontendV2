import * as React from 'react';
import { DatabaseObjectsContextType } from './helpers';

const initialValue: DatabaseObjectsContextType = {
  addOrUpdate: () => {},
  objects: {},
};

const DatabaseObjectContext = React.createContext<DatabaseObjectsContextType>(initialValue);

export { DatabaseObjectContext };
