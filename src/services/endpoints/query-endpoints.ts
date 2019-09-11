import axios from 'axios';
import { ApiCall, URL } from '~/services/api-calls';
import { UserType, UserCommonResponse, AddressStateResponse, AddressCityResponse } from '~/__types';

export class QueryEndpoints {
  getCategories = ({
    type,
  }: {
    type?: 'sub' | 'main' | 'all';
  } = {}) => {
    if (type !== 'all' && type) {
      return ApiCall.get(`/categories?filter=true&sub=${type === 'sub' ? 'true' : 'false'}`);
    }

    return ApiCall.get('/categories');
  };

  getCategoryByID = ({ id }: { id: string }) => ApiCall.get(`/categories/${id}`);

  getCategoriesWithoutSub = () => ApiCall.get('/categories?filter=true&sub=false');

  getProductByBarcode = ({ barcode }: { barcode: string }) => ApiCall.get(`/products/barcode/${barcode}`);

  getUsers = ({ type }: { type: UserType }) => {
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

  getAuthUser: () => Promise<UserCommonResponse> = () => ApiCall.get('/users/getmyinfos');

  getAuthUserActiveStates: () => Promise<AddressStateResponse[]> = () => ApiCall.get('/users/activeStates');

  checkHealth = () => axios.get(URL.concat('/health')).then(() => ({ id: 'he', status: true }));

  getCities: () => Promise<AddressCityResponse[]> = () => ApiCall.get('/definitions/cities');

  getStatesByCityId: (s: { cityId: string }) => Promise<AddressStateResponse[]> = ({ cityId }) =>
    ApiCall.get(`/definitions/cities/${cityId}/states`);

  getStates: () => Promise<any> = () => ApiCall.get('/definitions/states');
}
