import { UserRoleResponse } from './backend-models';

export interface User {
  username: string;
  role: UserRoleResponse;
  name: string;
  email: string;
  id: string;
  status?: boolean;
  taxNumber?: string;
  isAdmin: boolean;
  isMerchant: boolean;
  isCustomer: boolean;
}

export type UserType = 'active' | 'passive' | 'all';
