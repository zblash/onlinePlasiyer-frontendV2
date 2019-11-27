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
}

export interface ApplicationContextValues {
  user: User;
  permissions: UserPermissions;
}

export interface ApplicationProviderProps {
  user: IUserCommonResponse;
}
