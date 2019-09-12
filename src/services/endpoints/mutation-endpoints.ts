import axios from 'axios';
import { ApiCall, URL } from '~/services/api-calls';
import { UserRoleResponse, UnitTypeResponse, IProductResponse } from '~/__types';

export class MutationEndpoints {
  public deleteCategory: (s: { id: string }) => Promise<any> = ({ id }) => ApiCall.delete(`/categories/delete/${id}`);

  public updateCategory = ({
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

    delete _data.isSub;

    Object.keys(_data).forEach(key => {
      formData.append(key, _data[key]);
    });

    return ApiCall.put(`/categories/update/${id}`, formData);
  };

  createCategory = (params: { parentId: string | null; name: string; isSub: boolean; uploadfile: File }) => {
    const formData = new FormData();
    const _data = {
      ...params,
      subCategory: params.isSub ? 1 : 0,
    };
    Object.keys(_data).forEach(key => {
      formData.append(key, _data[key]);
    });

    return ApiCall.post('/categories/create', formData);
  };

  changeStatus = ({ id, status }: { id: string; status: boolean }) => {
    if (status) {
      return ApiCall.post(`/users/setActive/${id}`);
    }

    return ApiCall.post(`/users/setPassive/${id}`);
  };

  createProduct = (params: {
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
  };

  createSpecifyProductForAuthUser = (params: {
    barcode: string;
    contents: number;
    quantity: number;
    recommendedRetailPrice: number;
    stateIds: string[];
    totalPrice: number;
    unitPrice: number;
    unitType: UnitTypeResponse;
  }) => {
    return ApiCall.post('/products/specify/create', { ...params, stateList: params.stateIds, stateIds: undefined });
  };

  public login = (s: { username: string; password: string }) =>
    axios.post(`${URL}/signin`, s).then(({ data }) => {
      localStorage.setItem('_auth', `Bearer ${data.token}`);

      return data;
    });

  public signup = (data: {
    cityId: string;
    details: string;
    email: string;
    name: string;
    password: string;
    role: UserRoleResponse;
    stateId: string;
    taxNumber: string;
    username: string;
  }) => {
    const _data = {
      ...data,
      roleType: data.role,
      role: undefined,
    };

    return axios.post(`${URL}/sign-up`, _data).then(d => d.data);
  };

  public addActiveStatesForAuthUser = ({ stateIds }: { stateIds: string[] }) => {
    return ApiCall.post('/users/addActiveState', stateIds);
  };

  public deleteProduct: (s: { id: string }) => Promise<IProductResponse> = ({ id }) =>
    ApiCall.delete(`/products/delete/${id}`);
}
