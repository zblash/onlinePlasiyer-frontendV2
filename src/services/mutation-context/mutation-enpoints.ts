import { ApiCall } from '~/services/api';
import {
  ICardResponse,
  UnitTypeResponse,
  IProductResponse,
  IOrder,
  IUserCommonResponse,
  IAddressStateResponse,
  ISpecifyProductResponse,
  UserRoleResponse,
  IUserRegisterResponse,
  TOrderStatus,
} from '~/services/helpers/backend-models';

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
  removeCategory: (s: { id: string }) => Promise<any> = ({ id }) => ApiCall.delete(`/categories/${id}`);

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

    return ApiCall.post('/categories', formData);
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

    return ApiCall.post('/products', formData);
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
  }) => ApiCall.post('/products/specify', { ...params, stateList: params.stateIds, stateIds: undefined });

  updateSpecifyProduct: (params: {
    id: string;
    barcode: string;
    contents: number;
    quantity: number;
    recommendedRetailPrice: number;
    stateList: string[];
    totalPrice: number;
    unitPrice: number;
    unitType: UnitTypeResponse;
  }) => Promise<ISpecifyProductResponse> = ({ ...params }) => {
    const { id, ...others } = params;

    return ApiCall.put(`/products/specify/${params.id}`, { ...others });
  };

  addActiveStates: (s: { stateIds: string[] }) => Promise<IAddressStateResponse> = ({ stateIds }) =>
    ApiCall.post('/user/activestates', stateIds);

  removeItemFromCard: (s: { id: string }) => Promise<any> = ({ id }) =>
    ApiCall.post(`/cart/removeItem/${id}`).then(item => ({ ...item, removed: true }));

  removeProduct: (s: { id: string }) => Promise<IProductResponse> = ({ id }) =>
    ApiCall.delete(`/products/${id}`).then(item => ({ ...item, removed: true }));

  clearCard: () => Promise<any> = () => ApiCall.post('/cart/clear/');

  cardCheckout: () => Promise<IOrder[]> = () => ApiCall.post('/cart/checkout/');

  updateInfos: (params: {
    id?: string;
    address: {
      cityId: string;
      details: string;
      stateId: string;
    };
    email: string;
    name: string;
  }) => Promise<IUserCommonResponse> = (...params) => {
    if (params[0].id) {
      return ApiCall.put(`/users/infos/${params[0].id}`, ...params);
    }

    return ApiCall.put('/user/infos', ...params);
  };

  updatePassword: (params: { password: string; passwordConfirmation: string }) => Promise<any> = (...params) =>
    ApiCall.post('/user/changePassword', ...params);

  removeProductSpecify: (s: { id: string }) => Promise<ISpecifyProductResponse> = ({ id }) =>
    ApiCall.delete(`/products/specify/${id}`).then(item => ({ ...item, removed: true }));

  createUser: (params: {
    cityId: string;
    stateId: string;
    details: string;
    name: string;
    username: string;
    email: string;
    password: string;
    roleType: UserRoleResponse;
    status: boolean;
    taxNumber: string;
  }) => Promise<IUserRegisterResponse> = (...params) => ApiCall.post('/users', ...params);

  updateOrder: (params: {
    id: string;
    paidPrice?: number;
    discount?: number;
    status: TOrderStatus;
    wayBillDate: Date;
  }) => Promise<IOrder> = ({ ...params }) => {
    const { id, ...others } = params;

    return ApiCall.put(`/orders/${params.id}`, { ...others });
  };

  addBarcode: (params: { id: string; barcode: string }) => Promise<IProductResponse> = ({ id, barcode }) =>
    ApiCall.post(`/products/addbarcode/${id}`, { barcode });

  removeBarcode: (params: { id: string; barcode: string }) => Promise<IProductResponse> = ({ id, barcode }) =>
    ApiCall.post(`/products/removebarcode/${id}`, { barcode });

  deneme = () => Promise.resolve({ id: '12341' });
}

const mutationEndPoints = new MutationEndpoints();

export { mutationEndPoints };
