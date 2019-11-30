import { ApiCall } from '~/services/api';
import { ICardResponse, UnitTypeResponse, IProductResponse, IOrder, IUserCommonResponse } from '~/services/helpers/backend-models';

interface CreateCategoryVariables {
  parentId?: string | null;
  name: string;
  isSub: boolean;
  uploadFile: File;
}

interface UpdateCategoryVariables {
  id: string;
  parentId?: string | null;
  name: string;
  isSub: boolean;
  uploadFile?: null | File;
}

class MutationEndpoints {
  removeCategory: (s: { id: string }) => Promise<any> = ({ id }) => ApiCall.delete(`/categories/delete/${id}`);

  updateCategory = (params: UpdateCategoryVariables) => {
    const formData = new FormData();
    const { id } = params;
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

  createCategory = (params: CreateCategoryVariables) => {
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

  changeUserStatus = ({ id, status }: { id: string; status: boolean }) => {
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

  checkProduct = (params: { barcode: string }) => {
    return ApiCall.post(`/products/checkProduct/${params.barcode}`);
  };

  hasProduct = (params: { barcode: string }) => {
    return ApiCall.post(`/products/hasProduct/${params.barcode}`).then(data => ({
      id: `has-product-${params.barcode}`,
      hasBarcode: data,
    }));
  };

  addToCard: (s: { specifyProductId: string; quantity: number }) => Promise<ICardResponse> = ({
    specifyProductId,
    quantity,
  }) => ApiCall.post('/cart/addItem', { productId: specifyProductId, quantity });

  createSpecifyProductForAuthUser = (params: {
    barcode: string;
    contents: number;
    quantity: number;
    recommendedRetailPrice: number;
    stateIds: string[];
    totalPrice: number;
    unitPrice: number;
    unitType: UnitTypeResponse;
  }) => ApiCall.post('/products/specify/create', { ...params, stateList: params.stateIds, stateIds: undefined });

  addActiveStatesForAuthUser = ({ stateIds }: { stateIds: string[] }) => {
    return ApiCall.post('/users/addActiveState', stateIds);
  };

  removeItemFromCard: (s: { id: string }) => Promise<any> = ({ id }) =>
    ApiCall.post(`/cart/removeItem/${id}`).then(item => ({ ...item, removed: true }));

  removeProduct: (s: { id: string }) => Promise<IProductResponse> = ({ id }) =>
    ApiCall.delete(`/products/delete/${id}`).then(item => ({ ...item, removed: true }));

  clearCard: () => Promise<any> = () => ApiCall.post('/cart/clear/');

  cardCheckout: () => Promise<IOrder[]> = () => ApiCall.post('/cart/checkout/');

  updateInfos: (params: {
    address: {
      cityId: string;
      details: string;
      stateId: string;
    };
    email: string;
    name: string;
  }) => Promise<IUserCommonResponse> = (...params) => ApiCall.post('/users/updateInfos', ...params);

  updatePassword: (params: { password: string; passwordConfirmation: string }) => Promise<any> = (...params) =>
    ApiCall.post('/users/changePassword', ...params);

  deneme = () => Promise.resolve({ id: '12341' });
}

const mutationEndPoints = new MutationEndpoints();

export { mutationEndPoints };
