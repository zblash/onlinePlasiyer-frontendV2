import { IUserCommonResponse } from '~/services/helpers/backend-models';
import { UserPermissions } from './helpers';

function getPermissions(user: IUserCommonResponse): UserPermissions {
  return {
    category: {
      edit: user.role === 'ADMIN',
      delete: user.role === 'ADMIN',
      create: user.role === 'ADMIN',
    },
    product: {
      edit: user.role === 'ADMIN',
      delete: user.role === 'ADMIN',
      create: user.role === 'ADMIN',
    },
    showCart: user.role === 'CUSTOMER',
  };
}

export default getPermissions;
