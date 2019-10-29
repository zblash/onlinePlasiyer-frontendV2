import { UserRoleResponse } from '~/services/helpers';
import { UserRole } from '.';

export const USER_ROLE_MAP: Record<UserRoleResponse, UserRole> = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  MERCHANT: 'merchant',
};
