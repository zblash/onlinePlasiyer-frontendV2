import * as React from 'react';
import { ApplicationContextValues, applicationContextInitialValue } from './helpers';

const ApplicationContext = React.createContext<ApplicationContextValues>(applicationContextInitialValue);
function useApplicationContext() {
  return React.useContext(ApplicationContext);
}
function useUserPermissions() {
  return React.useContext(ApplicationContext).permissions;
}

export { ApplicationContext, useApplicationContext, useUserPermissions };
