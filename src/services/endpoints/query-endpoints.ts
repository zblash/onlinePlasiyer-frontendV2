import axios from 'axios';
import { ApiCall, URL } from '~/services/api-calls';
import {
  UserRole,
  IUserCommonResponse,
  IAddressStateResponse,
  IAddressCityResponse,
  ICategoryResponse,
  IProductResponse,
  ISpecifyProductResponse,
  ICardResponse,
  UserType,
  IOrder,
  Invoice,
} from '~/backend-model-helpers';

type GetCategoriesType = 'sub' | 'parent' | 'all';

export function refetchFactory<T, TVar>(query: (s: TVar) => Promise<T>, variables?: TVar) {
  return {
    query,
    variables,
  };
}

export class QueryEndpoints {
  getCategories: (s: { type: GetCategoriesType }) => Promise<ICategoryResponse[]> = ({ type }) => {
    if (type !== 'all' && type) {
      return ApiCall.get(`/categories?filter=true&sub=${type === 'sub' ? 'true' : 'false'}`);
    }

    return ApiCall.get('/categories');
  };

  getCategoryByID: (s: { id: string }) => Promise<ICategoryResponse> = ({ id }) => ApiCall.get(`/categories/${id}`);

  getCategoriesWithoutSub = () => ApiCall.get('/categories?filter=true&sub=false');

  getProductByBarcode: (s: { barcode: string }) => Promise<IProductResponse> = ({ barcode }) =>
    ApiCall.get(`/products/barcode/${barcode}`);

  getProductById: (s: { id: string }) => Promise<IProductResponse> = ({ id }) => ApiCall.get(`/products/${id}`);

  getAllSpecifyProductsByProductId: (s: { productId: string }) => Promise<ISpecifyProductResponse[]> = ({
    productId,
  }) => ApiCall.get(`/products/specify/product/${productId}`);

  getAllProducts: () => Promise<IProductResponse[]> = () => ApiCall.get(`/products/`);

  getCard: () => Promise<ICardResponse> = () => ApiCall.get(`/cart/`);

  getAllProductsByCategoryId: (s: { categoryId: string }) => Promise<IProductResponse[]> = ({ categoryId }) =>
    ApiCall.get(`/products/category/${categoryId}`);

  getUsers: (s: { role: UserRole; type: UserType }) => Promise<IUserCommonResponse[]> = ({ type, role }) => {
    const userTypeRouteMap: Record<UserRole, Record<UserType, string>> = {
      customers: {
        active: '/users/customers/active',
        all: '/users/customers/',
        passive: '/users/customers/passive',
      },
      merchants: {
        active: '/users/merchant/active',
        passive: '/users/merchant/passive',
        all: '/users/merchant/',
      },
      admin: {
        active: '/users/admin',
        passive: '/users/admin',
        all: '/users/admin',
      },
    };
    if (!['merchants', 'customers', 'admin'].includes(role) || !['active', 'all', 'passive'].includes(type)) {
      return Promise.reject(new Error('Type is not found'));
    }

    return ApiCall.get(userTypeRouteMap[role][type]);
  };

  getAuthUser: () => Promise<IUserCommonResponse> = () => ApiCall.get('/users/getmyinfos');

  getAuthUserActiveStates: () => Promise<IAddressStateResponse[]> = () => ApiCall.get('/users/activeStates');

  checkHealth = () =>
    axios.get(URL.concat('/health')).then(() => ({ id: 'a5a16900-4db7-4f6e-96fd-ae0d46eacdd4', status: true }));

  getCities: () => Promise<IAddressCityResponse[]> = () =>
    axios.get(URL.concat('/definitions/cities')).then(({ data }) => data);

  getStatesByCityId: (s: { cityId: string }) => Promise<IAddressStateResponse[]> = ({ cityId }) =>
    axios.get(URL.concat(`/definitions/cities/${cityId}/states`)).then(({ data }) => data);

  getStates: () => Promise<any> = () => axios.get(URL.concat('/definitions/states')).then(({ data }) => data);

  getAllOrders: () => Promise<IOrder[]> = () => ApiCall.get('/orders');
  getAllInvoices: () => Promise<Invoice[]> = () => ApiCall.get('/invoices');
}
