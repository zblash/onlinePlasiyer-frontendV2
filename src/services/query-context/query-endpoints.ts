import axios from 'axios';
import { ApiCall, URL } from '~/services/api';
import {
  ICategoryResponse,
  IProductResponse,
  ICardResponse,
  IUserCommonResponse,
  IAddressStateResponse,
  IAddressCityResponse,
  UserRoleResponse,
} from '~/services/helpers/backend-models';
import { UserType } from '../helpers/maps';

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

  getUsers: (s: { role: UserRoleResponse; type: UserType }) => Promise<IUserCommonResponse[]> = ({ type, role }) => {
    const userTypeRouteMap: Record<UserRoleResponse, Record<UserType, string>> = {
      CUSTOMER: {
        active: '/users/customers/active',
        all: '/users/customers/',
        passive: '/users/customers/passive',
      },
      MERCHANT: {
        active: '/users/merchant/active',
        passive: '/users/merchant/passive',
        all: '/users/merchant/',
      },
      ADMIN: {
        active: '/users/admin',
        passive: '/users/admin',
        all: '/users/admin',
      },
    };

    return ApiCall.get(userTypeRouteMap[role][type]);
  };

  getAuthUserActiveStates: () => Promise<IAddressStateResponse[]> = () => ApiCall.get('/users/activeStates');

  getCities: () => Promise<IAddressCityResponse[]> = () =>
    axios.get(URL.concat('/definitions/cities')).then(({ data }) => data);

  getStatesByCityId: (s: { cityId: string }) => Promise<IAddressStateResponse[]> = ({ cityId }) =>
    axios.get(URL.concat(`/definitions/cities/${cityId}/states`)).then(({ data }) => data);

  getStates: () => Promise<any> = () => axios.get(URL.concat('/definitions/states')).then(({ data }) => data);
}
const queryEndpoints = new QueryEndpoints();

export { queryEndpoints };