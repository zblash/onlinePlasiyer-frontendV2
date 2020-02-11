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

export interface ICreditResponse {
  id: string;
  totalDebt: number;
  creditLimit: number;
  userId: string;
  userName: string;
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
  states: IAddressStateResponse[];
  productId: string;
  productBarcodeList: string[];
  discount: boolean;
  promotion: IProductPromotion;
}

export interface IProductPromotion {
  promotionText: string;
  promotionType: PromotionType;
  discountValue: number;
  discountUnit: number;
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
  discountedTotalPrice: number;
}

export interface ICardResponse {
  id: string;
  items: ICartItemDetailResponse[];
  quantity: number;
  totalPrice: number;
}

export interface ICartItemDetailResponse {
  id: string;
  sellerId: string;
  sellerName: string;
  totalPrice: number;
  discountedTotalPrice: number;
  quantity: number;
  details: ICardItemResponse[];
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
  commission?: number;
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
  buyerAddress: IAddressResponse;
}

export interface IOrderSummary {
  id: string;
  newCount: number;
  finishedCount: number;
  cancelledCount: number;
  paidCount: number;
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
  debt: number;
  receivable: number;
  userName: string;
  userId: string;
}

export interface IAnnouncement {
  id: string;
  fileUrl: string;
  lastDate: string;
  message: string;
  title: string;
}

export interface IUserRegisterResponse {
  email: string;
  id: string;
  name: string;
  status: boolean;
  taxNumber: string;
  username: string;
}

export interface INotificationResponse {
  id: string;
  title: string;
  message: string;
  userId: string;
  userName: string;
}

export interface IPaymentMethodsResponse {
  id: string;
  displayName: string;
  paymentOption: string;
}

export interface ITicketResponse {
  id: string;
  title: string;
  status: string;
  openerName: string;
  addedTime: Date;
}

export interface ITicketReplyResponse {
  id: string;
  message: string;
  username: string;
  addedTime: Date;
}

export interface IOrderConfirmItem {
  id: string;
  quantity: number;
  removed: boolean;
}

export interface ICreditActivityResponse {
  id: string;
  documentNo: number;
  price: number;
  creditLimit: number;
  totalDebt: number;
  creditActivityType: CreditActivityType;
  creditType: CreditType;
  customerId: string;
  customerName: string;
  merchantId?: string;
  merchantName?: string;
  date: Date;
}

export interface IObligationActivityResponse {
  id: string;
  price: number;
  documentNo: number;
  userId: string;
  userName: string;
  date: Date;
  obligationActivityType: CreditActivityType;
  totalDebt: number;
  totalReceivable: number;
}

export type UserRoleResponse = 'ADMIN' | 'MERCHANT' | 'CUSTOMER';

export type UnitTypeResponse = 'KG' | 'KL' | 'AD';

export type TOrderStatus = 'NEW' | 'FINISHED' | 'CONFIRMED' | 'CANCELLED' | 'CANCEL_REQUEST';

export type PromotionType = 'PERCENT' | 'PROMOTION';

export type CreditActivityType = 'DEBT' | 'CREDIT';

export type CreditType = 'SYSTEM_CREDIT' | 'MERCHANT_CREDIT';
