import axios from 'axios';
import { ApiCall, URL } from '~/services/api';
import {
  ICategoryResponse,
  IProductResponse,
  ICardResponse,
  IUserCommonResponse,
  IAddressStateResponse,
  IAddressCityResponse,
  IOrder,
  Invoice,
} from '../helpers';
import { UserRole, UserType } from '~/helpers';

type GetCategoriesType = 'sub' | 'parent' | 'all';
class QueryEndpoints {
  getCategories: (s: { type: GetCategoriesType }) => Promise<ICategoryResponse[]> = ({ type }) =>
    ApiCall.get(`/categories`, {
      filter: type !== 'all',
      sub: type === 'sub',
    });

  getCategoryByID: (s: { id: string }) => Promise<ICategoryResponse> = ({ id }) => ApiCall.get(`/categories/${id}`);

  getProductByBarcode: (s: { barcode: string }) => Promise<IProductResponse> = ({ barcode }) =>
    ApiCall.get(`/products/barcode/${barcode}`);

  getProductById: (s: { id: string }) => Promise<IProductResponse> = ({ id }) => ApiCall.get(`/products/${id}`);

  getCard: () => Promise<ICardResponse> = () => ApiCall.get(`/cart/`);

  getUsers: (s: { role: UserRole; type: UserType }) => Promise<IUserCommonResponse[]> = ({ type, role }) => {
    const userTypeRouteMap: Record<UserRole, Record<UserType, string>> = {
      customer: {
        active: '/users/customers/active',
        all: '/users/customers/',
        passive: '/users/customers/passive',
      },
      merchant: {
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

  getAuthUserActiveStates: () => Promise<IAddressStateResponse[]> = () => ApiCall.get('/users/activeStates');

  getCities: () => Promise<IAddressCityResponse[]> = () =>
    axios.get(URL.concat('/definitions/cities')).then(({ data }) => data);

  getStatesByCityId: (s: { cityId: string }) => Promise<IAddressStateResponse[]> = ({ cityId }) =>
    axios.get(URL.concat(`/definitions/cities/${cityId}/states`)).then(({ data }) => data);

  getStates: () => Promise<any> = () => axios.get(URL.concat('/definitions/states')).then(({ data }) => data);

  getAllOrders: () => Promise<IOrder[]> = () => ApiCall.get('/orders');

  getAllInvoices: () => Promise<Invoice[]> = () => ApiCall.get('/invoices');
}
const queryEndpoints = new QueryEndpoints();

export { queryEndpoints };
