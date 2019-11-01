import { UserRoleResponse, TOrderStatus } from './backend-models';

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

export const USER_ROLE_MAP: Record<UserRoleResponse, UserRole> = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  MERCHANT: 'merchant',
};
