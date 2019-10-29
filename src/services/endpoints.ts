import axios from 'axios';
import { ApiCall, URL } from '~/services/api-calls';
import {
  IUserCommonResponse,
  IAddressStateResponse,
  IAddressCityResponse,
  ICategoryResponse,
  IProductResponse,
  ISpecifyProductResponse,
  ICardResponse,
  IOrder,
  Invoice,
  UnitTypeResponse,
  UserRoleResponse,
} from '~/services/helpers';
import { UserRole, UserType } from '~/helpers';
import { TOKEN_KEY } from '~/utils/constants';

type GetCategoriesType = 'sub' | 'parent' | 'all';

function refetchFactory<T, TVar>(query: (s: TVar) => Promise<T>, variables?: TVar) {
  return {
    query,
    variables,
  };
}

class QueryEndpoints {
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

  getAuthUser: () => Promise<IUserCommonResponse> = () => ApiCall.get('/users/getmyinfos');

  getAuthUserActiveStates: () => Promise<IAddressStateResponse[]> = () => ApiCall.get('/users/activeStates');

  getCities: () => Promise<IAddressCityResponse[]> = () =>
    axios.get(URL.concat('/definitions/cities')).then(({ data }) => data);

  getStatesByCityId: (s: { cityId: string }) => Promise<IAddressStateResponse[]> = ({ cityId }) =>
    axios.get(URL.concat(`/definitions/cities/${cityId}/states`)).then(({ data }) => data);

  getStates: () => Promise<any> = () => axios.get(URL.concat('/definitions/states')).then(({ data }) => data);

  getAllOrders: () => Promise<IOrder[]> = () => ApiCall.get('/orders');
  getAllInvoices: () => Promise<Invoice[]> = () => ApiCall.get('/invoices');
}

function checkHealthEnpoint() {
  return axios.get(URL.concat('/health')).then(() => ({ id: 'a5a16900-4db7-4f6e-96fd-ae0d46eacdd4', status: true }));
}

interface CreateCategoryVariables {
  parentId: string | null;
  name: string;
  isSub: boolean;
  uploadFile: File;
}

interface UpdateCategoryVariables {
  id: string;
  parentId: string | null | undefined;
  name: string;
  isSub: boolean;
  uploadFile?: null | File;
}

// TODO: move to react context
class MutationEndpoints {
  deleteCategory: (s: { id: string }) => Promise<any> = ({ id }) => ApiCall.delete(`/categories/delete/${id}`);

  updateCategory = (params: UpdateCategoryVariables) => {
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
  }) => {
    return ApiCall.post('/products/specify/create', { ...params, stateList: params.stateIds, stateIds: undefined });
  };

  login = (s: { username: string; password: string }) =>
    axios.post(`${URL}/signin`, s).then(({ data }) => {
      // TODO: src\context\application\index.tsx  use setToken Function
      localStorage.setItem(TOKEN_KEY, JSON.stringify(`Bearer ${data.token}`));

      return data;
    });

  signup = (data: {
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

  addActiveStatesForAuthUser = ({ stateIds }: { stateIds: string[] }) => {
    return ApiCall.post('/users/addActiveState', stateIds);
  };

  removeItemFromCard: (s: { id: string }) => Promise<any> = ({ id }) => ApiCall.post(`/cart/removeItem/${id}`);

  deleteProduct: (s: { id: string }) => Promise<IProductResponse> = ({ id }) =>
    ApiCall.delete(`/products/delete/${id}`);

  clearCard: () => Promise<any> = () => ApiCall.post('/cart/clear/');

  cardCheckout: () => Promise<any> = () => ApiCall.post('/cart/checkout/');
}

const mutationEndPoints = new MutationEndpoints();

const queryEndpoints = new QueryEndpoints();

export { queryEndpoints, mutationEndPoints, checkHealthEnpoint };
