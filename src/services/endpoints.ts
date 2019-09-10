import axios from 'axios';
import { ApiCall, URL } from './api-calls';
import { UserType, UserCommonResponse, AdressStateResponse } from '~/__types';
// import { AQueryEndpoints } from './AQueryEndpoints';

class QueryEndpoints {
  getCategories = ({ filter, isSub }: { filter?: boolean; isSub?: boolean }) => {
    if (filter) {
      return ApiCall.get(`/categories?filter=true&sub=${isSub}`);
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

  getAuthUserActiveStates: () => Promise<AdressStateResponse[]> = () => ApiCall.get('/users/activeStates');

  checkHealth = () => axios.get(URL.concat('/health')).then(() => ({ id: 'he', status: true }));

  getCities: () => Promise<any> = () => ApiCall.get('/definitions/cities');

  getStatesByCityId: (s: { cityId: string }) => Promise<any> = ({ cityId }) =>
    ApiCall.get(`/definitions/cities/${cityId}/states`);

  getStates: () => Promise<any> = () => ApiCall.get('/definitions/states');
}

const queryEndpoints = new QueryEndpoints();

const mutationEndPoints = {
  deleteCategory: ({ id }) => ApiCall.delete(`/categories/delete/${id}`),
  updateCategory: ({
    id,
    params,
  }: {
    id: string;
    params: {
      parentId: string | null | undefined;
      name: string;
      isSub: boolean;
      uploadfile?: null | File;
    };
  }) => {
    const formData = new FormData();
    const _data = {
      ...params,
      subCategory: params.isSub ? 1 : 0,
    };
    Object.keys(_data).forEach(key => {
      if (key !== 'isSub') {
        formData.append(key, _data[key]);
      }
    });

    return ApiCall.put(`/categories/update/${id}`, formData);
  },

  createCategory: (params: { parentId: string | null; name: string; isSub: boolean; uploadfile: File }) => {
    const formData = new FormData();
    const _data = {
      ...params,
      subCategory: params.isSub ? 1 : 0,
    };
    Object.keys(_data).forEach(key => {
      formData.append(key, _data[key]);
    });

    return ApiCall.post('/categories/create', formData);
  },
  changeStatus: ({ id, status }: { id: string; status: boolean }) => {
    if (status) {
      return ApiCall.post(`/users/setActive/${id}`);
    }

    return ApiCall.post(`/users/setPassive/${id}`);
  },
  createProduct: (params: {
    barcode: string;
    categoryId: string;
    name: string;
    status?: boolean;
    tax: number;
    uploadfile: File;
  }) => {
    const formData = new FormData();
    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });

    return ApiCall.post('/products/create', formData);
  },
  login: (s: { username: string; password: string }) =>
    axios.post(`${URL}/signin`, s).then(({ data }) => {
      localStorage.setItem('_auth', `Bearer ${data.token}`);

      return data;
    }),
};

export { queryEndpoints, mutationEndPoints };
