import { UserType, PublicUserRole, UserRoleResponse } from '~/__types';
import { stringLitArray } from '.';

export const ROLE_MAP: Record<PublicUserRole, UserRoleResponse> = {
  customer: 'CUSTOMER',
  merchant: 'MERCHANT',
};

export const userRoleArray = stringLitArray(['admin', 'merchant', 'customer']);

export const publicUserRoleArray = stringLitArray(['merchant', 'customer']);

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
