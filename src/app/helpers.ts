import { User } from '~/services/helpers/maps';
import { IUserCommonResponse } from '~/services/helpers/backend-models';

export interface Permission {
  edit: boolean;
  delete: boolean;
  create: boolean;
}

export interface UserPermissions {
  category: Permission;
  product: Permission;
  showCart: boolean;
}

export interface ApplicationContextValues {
  user: User;
  permissions: UserPermissions;
  loading: {
    show: () => void;
    hide: () => void;
  };
}

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
    status: false,
    taxNumber: 'TR123',
    address: {
      cityName: '',
      cityId: '',
      stateId: '',
      stateName: '',
      details: '',
      id: '',
    }
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

export interface ApplicationProviderProps {
  user: IUserCommonResponse;
}
