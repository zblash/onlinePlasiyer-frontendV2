import * as React from 'react';
import { PaginationQueryContextType } from './helpers';

const initialValue: PaginationQueryContextType = {};

const PaginationQueryContext = React.createContext(initialValue);

export { PaginationQueryContext };
