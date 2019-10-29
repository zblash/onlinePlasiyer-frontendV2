import * as React from 'react';
import { QueryContextType } from './helpers';

const initialValue: QueryContextType = {};

const QueryContext = React.createContext(initialValue);

export { QueryContext };
