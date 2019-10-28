import axios from 'axios';
import { ApiCall, URL } from '~/services/api-calls';
import { UserRoleResponse, UnitTypeResponse, IProductResponse, ICardResponse } from '~/backend-model-helpers';
import { TOKEN_KEY } from '~/utils/constants';

export interface CreateCategoryVariables {
  parentId: string | null;
  name: string;
  isSub: boolean;
  uploadFile: File;
}

export interface UpdateCategoryVariables {
  id: string;
  parentId: string | null | undefined;
  name: string;
  isSub: boolean;
  uploadFile?: null | File;
}

// TODO: move to react context
export class MutationEndpoints {
  public deleteCategory: (s: { id: string }) => Promise<any> = ({ id }) => ApiCall.delete(`/categories/delete/${id}`);

  public updateCategory = (params: UpdateCategoryVariables) => {
    const formData = new FormData();
    const id = params.id;
    const data = {
      ...params,
      subCategory: params.isSub ? 1 : 0,
      uploadfile: params.uploadFile,
    };

    delete data.isSub;
    delete data.uploadFile;
    delete data.id;

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    return ApiCall.put(`/categories/update/${id}`, formData);
  };

  public createCategory = (params: CreateCategoryVariables) => {
    const formData = new FormData();
    const _data = {
      ...params,
      subCategory: params.isSub ? 1 : 0,
      uploadfile: params.uploadFile,
    };

    delete _data.isSub;
    delete _data.uploadFile;

    Object.keys(_data).forEach(key => {
      formData.append(key, _data[key]);
    });

    return ApiCall.post('/categories/create', formData);
  };

  public changeUserStatus = ({ id, status }: { id: string; status: boolean }) => {
    if (status) {
      return ApiCall.post(`/users/setActive/${id}`);
    }

    return ApiCall.post(`/users/setPassive/${id}`);
  };

  public createProduct = (params: {
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

  public addToCard: (s: { specifyProductId: string; quantity: number }) => Promise<ICardResponse> = ({
    specifyProductId,
    quantity,
  }) => ApiCall.post('/cart/addItem', { productId: specifyProductId, quantity });

  public createSpecifyProductForAuthUser = (params: {
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
      // TODO: src\context\application\index.tsx  use setToken Function
      localStorage.setItem(TOKEN_KEY, JSON.stringify(`Bearer ${data.token}`));

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

  public removeItemFromCard: (s: { id: string }) => Promise<any> = ({ id }) => ApiCall.post(`/cart/removeItem/${id}`);

  public deleteProduct: (s: { id: string }) => Promise<IProductResponse> = ({ id }) =>
    ApiCall.delete(`/products/delete/${id}`);

  public clearCard: () => Promise<any> = () => ApiCall.post('/cart/clear/');

  public cardCheckout: () => Promise<any> = () => ApiCall.post('/cart/checkout/');
}
