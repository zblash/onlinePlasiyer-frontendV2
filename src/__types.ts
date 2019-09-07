export type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;

export interface AddressResponse {
  city: string;
  details: string;
  state: string;
  id: number;
}

export interface ActiveStatesResponse {
  code: number;
  id: string;
  title: string;
}

export interface UserResponse {
  username: string;
  role: UserRole;
  name: string;
  email: string;
  address: AddressResponse;
  id: string;
  activeStates: ActiveStatesResponse[];
}

export type SellerResponse = UserResponse & {
  status: number;
  taxNumber: string;
};

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
    unitType: 'KG' | 'KL' | 'AD';
    // TODO : uniqueType type
  }[];
  sellerName: string;
  status: 'FINISHED' | 'NEW' | 'CANCELLED' | 'PAID';
  // TODO : status type
  totalPrice: number;
  waybillDate: string;
}

export type UserRoleKey = 'admin' | 'merchant' | 'customer';

export type UserRole = 'ADMIN' | 'MERCHANT' | 'CUSTOMER';
