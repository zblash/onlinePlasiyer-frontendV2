export type EndpointGetter<T> = (queries: T) => T[keyof T];

export interface RouteSchema {
  id: string;
  props?: {
    [key: string]: RouteSchema | RouteSchema[];
  };
}

export interface ServicesContextProviderComponentState {
  dataCache: Record<string, any>;
  routeCache: Record<
    string,
    {
      usedIds: string[];
      schema: RouteSchema | RouteSchema[];
    }
  >;
}

export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
export type FirstArgument<F extends Function> = ArgumentTypes<F>[0];
type ThenArg<T> = T extends Promise<infer U> ? U : T;

export type EndpointsResultType<F> = F extends (v: any) => Promise<any> ? ThenArg<ReturnType<F>> | null : F;

export type EndpointsVariablesType<F> = F extends Function ? ArgumentTypes<F>[0] : F;

export type QueryVariablesOptions<T> = T extends undefined
  ? {
      variables?: T;
    }
  : {
      variables: T;
    };

export interface IAddressStateResponse {
  cityTitle: string;
  code: number;
  id: string;
  title: string;
}

export interface IAddressCityResponse {
  code: number;
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

export type TOrderStatus = 'NEW' | 'FINISHED' | 'PAID' | 'CANCELLED';

export interface IOrderItems {
  price: number;
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
}

export type UserRoleResponse = 'ADMIN' | 'MERCHANT' | 'CUSTOMER';

export type PublicUserRole = 'MERCHANT' | 'CUSTOMER';

export type UnitTypeResponse = 'KG' | 'KL' | 'AD';
