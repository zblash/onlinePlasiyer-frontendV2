import axios from 'axios';
import { ApiCall, URL } from '~/services/api-calls';
import {
  UserType,
  IUserCommonResponse,
  IAddressStateResponse,
  IAddressCityResponse,
  ICategoryResponse,
  IProductResponse,
  ISpecifyProductResponse,
  ICardResponse,
  IOrder,
} from '~/__types';

export function refetchFactory<T, TVar>(query: (s: TVar) => Promise<T>, variables?: TVar) {
  return {
    query,
    variables,
  };
}

export class QueryEndpoints {
  public getCategories: (s: { type?: 'sub' | 'main' | 'all' }) => Promise<ICategoryResponse[]> = ({ type } = {}) => {
    if (type !== 'all' && type) {
      return ApiCall.get(`/categories?filter=true&sub=${type === 'sub' ? 'true' : 'false'}`);
    }

    return ApiCall.get('/categories');
  };

  public getCategoryByID: (s: { id: string }) => Promise<ICategoryResponse> = ({ id }) =>
    ApiCall.get(`/categories/${id}`);

  public getCategoriesWithoutSub = () => ApiCall.get('/categories?filter=true&sub=false');

  public getProductByBarcode: (s: { barcode: string }) => Promise<IProductResponse> = ({ barcode }) =>
    ApiCall.get(`/products/barcode/${barcode}`);

  public getProductById: (s: { id: string }) => Promise<IProductResponse> = ({ id }) => ApiCall.get(`/products/${id}`);

  public getAllSpecifyProductsByProductId: (s: { productId: string }) => Promise<ISpecifyProductResponse[]> = ({
    productId,
  }) => ApiCall.get(`/products/specify/product/${productId}`);

  public getAllProducts: () => Promise<IProductResponse[]> = () => ApiCall.get(`/products/`);

  public getCard: () => Promise<ICardResponse> = () => ApiCall.get(`/cart/`);

  public getAllProductsByCategoryId: (s: { categoryId: string }) => Promise<IProductResponse[]> = ({ categoryId }) =>
    ApiCall.get(`/products/category/${categoryId}`);

  public getUsers = ({ type }: { type: UserType }) => {
    const userTypeRouteMap: Record<UserType, string> = {
      'customers-active': '/users/customers/active',
      'customers-all': '/users/customers/',
      'customers-passive': '/users/customers/passive',
      'merchants-active': '/users/merchant/active',
      'merchants-passive': '/users/merchant/passive',
      'merchants-all': '/users/merchant/',
    };
    if (!Object.keys(userTypeRouteMap).includes(type)) {
      return Promise.reject(new Error('Type is not found'));
    }

    return ApiCall.get(userTypeRouteMap[type]);
  };

  public getAuthUser: () => Promise<IUserCommonResponse> = () => ApiCall.get('/users/getmyinfos');

  public getAuthUserActiveStates: () => Promise<IAddressStateResponse[]> = () => ApiCall.get('/users/activeStates');

  public checkHealth = () => axios.get(URL.concat('/health')).then(() => ({ id: 'he', status: true }));

  public getCities: () => Promise<IAddressCityResponse[]> = () =>
    axios.get(URL.concat('/definitions/cities')).then(({ data }) => data);

  public getStatesByCityId: (s: { cityId: string }) => Promise<IAddressStateResponse[]> = ({ cityId }) =>
    axios.get(URL.concat(`/definitions/cities/${cityId}/states`)).then(({ data }) => data);

  public getStates: () => Promise<IAddressStateResponse[]> = () =>
    axios.get(URL.concat('/definitions/states')).then(({ data }) => data);

  public getAllOrders: () => Promise<IOrder[]> = () => ApiCall.get('/orders');
}
