import * as React from 'react';
import { ApplicationContextValues, Permission } from './helpers';

const initialPermission: Permission = {
  create: false,
  delete: false,
  edit: false,
};

export const applicationContextInitialValue: ApplicationContextValues = {
  user: {
    name: '',
    email: '',
    id: '',
    role: 'ADMIN',
    username: '',
    isAdmin: false,
    isCustomer: false,
    isMerchant: false,
  },
  permissions: {
    category: initialPermission,
    product: initialPermission,
    showCart: false,
  },
  loading: {
    show: () => {},
    hide: () => {},
  },
};

const ApplicationContext = React.createContext<ApplicationContextValues>(applicationContextInitialValue);
function useApplicationContext() {
  return React.useContext(ApplicationContext);
}
function useUserPermissions() {
  return useApplicationContext().permissions;
}

export { ApplicationContext, useApplicationContext, useUserPermissions };
