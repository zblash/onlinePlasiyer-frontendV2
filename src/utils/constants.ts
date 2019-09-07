import { UserRole } from '~/__types';

export const ROLE_MAP: { [key: string]: UserRole } = {
  admin: 'ADMIN',
  merchant: 'MERCHANT',
  customer: 'CUSTOMER',
};
