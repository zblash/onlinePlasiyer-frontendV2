export interface IAddressStateResponse {
  cityTitle: string;
  code: number;
  id: string;
  title: string;
}

export interface IAddressResponse {
  cityId: string;
  cityName: string;
  details: string;
  id: string;
  stateId: string;
  stateName: string;
}

export interface IAddressCityResponse {
  code: number;
  id: string;
  title: string;
}

export interface IProductResponse {
  active: boolean;
  barcodeList: string[];
  categoryName: string;
  categoryId: string;
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
  productId: string;
  productBarcodeList: string[];
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
  activeStates: IAddressStateResponse[];
  address: IAddressResponse;
}

export interface ICategoryResponse {
  id: string;
  name: string;
  parentId: string | null;
  photoUrl: string;
  subCategory: boolean;
}

export interface IOrderItems {
  price: number;
  id: string;
  productBarcodeList: string[];
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

export interface IOrder {
  buyerName: string;
  id: string;
  orderDate: string;
  orderItems: IOrderItems[];
  sellerName: string;
  status: TOrderStatus;
  totalPrice: number;
  waybillDate: string | null;
}

export interface Invoice {
  buyer: string;
  discount: number;
  id: string;
  paidPrice: number;
  seller: string;
  totalPrice: number;
  unPaidPrice: number;
  order: IOrder;
}

export interface IObligationTotals {
  id: string;
  totalDebts: number;
  totalReceivables: number;
}

export interface IAnnouncement {
  id: string;
  fileUrl: string;
  lastDate: string;
  message: string;
  title: string;
}

export type UserRoleResponse = 'ADMIN' | 'MERCHANT' | 'CUSTOMER';

export type UnitTypeResponse = 'KG' | 'KL' | 'AD';

export type TOrderStatus = 'NEW' | 'FINISHED' | 'PAID' | 'CANCELLED';
