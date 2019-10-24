export interface IAddressStateResponse {
  cityTitle: string;
  code: 0;
  id: string;
  title: string;
}

export interface IAddressCityResponse {
  code: 0;
  id: string;
  title: string;
}

export interface IProductResponse {
  active: boolean;
  barcode: string;
  categoryName: string;
  id: string;
  name: string;
  photoUrl: string;
  tax: number;
}

export interface ISpecifyProductResponse {
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
  productId: string;
}

export interface ICardItemResponse {
  id: string;
  productBarcode: string;
  productName: string;
  productPhotoUrl: string;
  productPrice: number;
  productTax: number;
  quantity: number;
  recommendedRetailPrice: number;
  sellerName: string;
  totalPrice: number;
  unitPrice: number;
  unitType: UnitTypeResponse;
}

export interface ICardResponse {
  id: string;
  items: ICardItemResponse[];
  quantity: number;
  totalPrice: number;
}

export interface IUserCommonResponse {
  username: string;
  role: UserRoleResponse;
  name: string;
  email: string;
  id: string;
  status?: boolean;
  taxNumber?: string;
  activeStates?: IAddressStateResponse[];
}

export interface ICategoryResponse {
  id: string;
  name: string;
  parentId: string | null;
  photoUrl: string;
  subCategory: boolean;
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