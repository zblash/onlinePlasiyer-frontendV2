import { UserRoleResponse, UnitTypeResponse } from '~/backend-model-helpers';

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

export const NONE_IMAGE_SRC = 'http://clipart-library.com//image_gallery/515068.png';

export const TOKEN_KEY = 'token';
