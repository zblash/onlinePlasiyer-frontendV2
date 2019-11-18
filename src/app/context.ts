import * as React from 'react';
import { ApplicationContextValues, applicationContextInitialValue } from './helpers';

const ApplicationContext = React.createContext<ApplicationContextValues>(applicationContextInitialValue);
function useApplicationContext() {
  return React.useContext(ApplicationContext);
}

export { ApplicationContext, useApplicationContext };
