import { User } from '~/services/helpers/maps';
import { IUserCommonResponse } from '~/services/helpers/backend-models';

interface Permission {
  edit: boolean;
  delete: boolean;
  create: boolean;
}

export interface UserPermissions {
  category: Permission;
  product: Permission;
}

export interface ApplicationContextValues {
  user: User;
  permissions: UserPermissions;
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
  },
  permissions: {
    category: initialPermission,
    product: initialPermission,
  },
};

export interface ApplicationProviderProps {
  user: IUserCommonResponse;
}
