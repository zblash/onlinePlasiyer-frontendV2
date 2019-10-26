import { UserType, UserRoleResponse, UnitTypeResponse } from '~/backend-model-helpers';
import { stringLitArray } from '.';

export const ROLE_MAP: Record<UserRoleResponse, string> = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  MERCHANT: 'merchant',
};

export const UNIT_TYPE_MAP: Record<UnitTypeResponse, string> = {
  AD: 'Adet',
  KG: 'Kilo',
  KL: 'koli',
};

export const userTypeArray = stringLitArray([
  'customers-all',
  'merchants-all',
  'merchants-active',
  'customers-active',
  'customers-passive',
  'merchants-passive',
]);

export const userTypeMap: Record<UserType, string> = {
  'customers-active': 'Active Customers',
  'customers-all': 'All Customers',
  'customers-passive': 'Passive Customers',
  'merchants-active': 'Active Merchants',
  'merchants-all': 'All Merchants',
  'merchants-passive': 'Passive Merchants',
};

export const NONE_IMAGE_SRC = 'http://clipart-library.com//image_gallery/515068.png';

export const TOKEN_KEY = 'token';
