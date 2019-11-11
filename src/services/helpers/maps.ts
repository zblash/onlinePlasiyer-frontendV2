import { UserRoleResponse } from './backend-models';

export type UserRole = 'admin' | 'merchant' | 'customer';

export interface User {
  username: string;
  role: UserRole;
  name: string;
  email: string;
  id: string;
  status?: boolean;
  taxNumber?: string;
}

export type UserType = 'active' | 'passive' | 'all';

export const USER_ROLE_RESPONSE_MAP: Record<UserRoleResponse, UserRole> = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  MERCHANT: 'merchant',
};

export const USER_ROLE_MAP: Record<UserRole, UserRoleResponse> = {
  admin: 'ADMIN',
  customer: 'CUSTOMER',
  merchant: 'MERCHANT',
};
