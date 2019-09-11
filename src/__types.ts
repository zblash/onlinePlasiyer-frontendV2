export interface AddressStateResponse {
  cityTitle: string;
  code: 0;
  id: string;
  title: string;
}

export interface AddressCityResponse {
  code: 0;
  id: string;
  title: string;
}

interface SpecifyProductResponse {
  id: string;
  totalPrice: number;
  unitPrice: number;
  quantity: number;
  contents: number;
  unitType: UnitTypeResponse;
  recommendedRetailPrice: number;
  productName: string;
  sellerName: string;
  states: string[];
}

export interface UserCommonResponse {
  username: string;
  role: UserRoleResponse;
  name: string;
  email: string;
  id: string;
  status?: boolean;
  taxNumber?: string;
  activeStates?: AddressStateResponse[];
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

export type UserType =
  | 'customers-active'
  | 'customers-all'
  | 'customers-passive'
  | 'merchants-active'
  | 'merchants-all'
  | 'merchants-passive';

export type PublicUserRole = 'MERCHANT' | 'CUSTOMER';

export type UnitTypeResponse = 'KG' | 'KL' | 'AD';
