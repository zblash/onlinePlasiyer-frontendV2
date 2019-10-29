import * as React from 'react';
import { MutationContextType } from './helpers';

const initialValue: MutationContextType = {};

const MutationContext = React.createContext(initialValue);

export { MutationContext };
