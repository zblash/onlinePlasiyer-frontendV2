import { userRoleArray, userTypeArray, publicUserRoleArray, UNIT_TYPES_ARRAY } from './utils/constants';

export interface AddressResponse {
  city: string;
  details: string;
  state: string;
  id: number;
}

export interface AdressStateResponse {
  cityTitle: string;
  code: 0;
  id: string;
  title: string;
}

export interface ActiveStatesResponse {
  code: number;
  id: string;
  title: string;
}

export interface UserCommonResponse {
  username: string;
  role: UserRoleResponse;
  name: string;
  email: string;
  address: AddressResponse;
  id: string;
  status?: boolean;
  taxNumber?: string;
  activeStates?: ActiveStatesResponse[];
}

export interface CategoryResponse {
  id: string;
  name: string;
  parentId: string | null;
  photoUrl: string;
  subCategory: boolean;
}

export interface OrderResponse {
  buyerName: string;
  id: string;
  orderDate: string;
  orderItems: {
    id: string;
    price: number;
    productBarcode: string;
    productName: string;
    productPhotoUrl: string;
    productTax: number;
    quantity: number;
    recommendedRetailPrice: number;
    totalPrice: number;
    unitPrice: number;
    sellerName: string;
    unitType: UnitTypeResponse;
  }[];
  sellerName: string;
  status: 'FINISHED' | 'NEW' | 'CANCELLED' | 'PAID';
  // TODO : status type
  totalPrice: number;
  waybillDate: string;
}

export type UserRoleResponse = 'ADMIN' | 'MERCHANT' | 'CUSTOMER';

export type UserRole = (typeof userRoleArray)[number];

export type PublicUserRole = (typeof publicUserRoleArray)[number];

export type UserType = (typeof userTypeArray)[number];

export type UnitTypeResponse = (typeof UNIT_TYPES_ARRAY)[number];
