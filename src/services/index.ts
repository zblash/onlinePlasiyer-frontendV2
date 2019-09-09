import axios from 'axios';
import { ROLE_MAP } from '~/utils/constants';
import { UserCommonResponse, CategoryResponse, OrderResponse, UserType } from '~/__types';

const URL = 'http://localhost:8080';

class ApiService {
  private token;

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('_auth');
    }

    return this.token;
  }

  private cache: Record<string, any> = {};

  public login = (username: string, password: string) => {
    return axios
      .post(`${URL}/signin`, {
        username,
        password,
      })
      .then(({ data }) => {
        localStorage.setItem('_auth', `Bearer ${data.token}`);

        return data;
      });
  };

  public logout(): void {
    localStorage.removeItem('_auth');
  }

  public signup = (data: {
    city: string;
    details: string;
    email: string;
    name: string;
    password: string;
    role: keyof typeof ROLE_MAP;
    state: string;
    taxNumber: string;
    username: string;
  }) => {
    const _data = {
      ...data,
      roleType: ROLE_MAP[data.role],
      role: undefined,
    };

    return axios.post(`${URL}/sign-up`, _data).then(d => d.data);
  };

  public getAuthUser: () => Promise<UserCommonResponse> = () => {
    return this.post('/users/getmyinfos');
  };

  public isLoggedIn: () => boolean = () => {
    return Boolean(this.getToken());
  };

  public getCategoriesWithoutSub: () => Promise<CategoryResponse[]> = () => {
    return this.get('/categories?filter=true&sub=false');
  };

  public getAllCategories: () => Promise<CategoryResponse[]> = () => {
    return this.get('/categories');
  };

  public getCategory: (id: string) => Promise<CategoryResponse> = id => {
    return this.get(`/categories/${id}`);
  };

  public deleteCategory: (id: string) => Promise<CategoryResponse> = (id: string) => {
    return this.delete(`/categories/delete/${id}`);
  };

  public updateCategory: (s: {
    id: string;
    params: {
      parentId: string | null;
      name: string;
      isSub: boolean;
      uploadfile: null | File;
    };
  }) => Promise<CategoryResponse> = ({ id, params }) => {
    const formData = new FormData();
    const _data = {
      ...params,
      subCategory: params.isSub ? 1 : 0,
    };
    Object.keys(_data).forEach(key => {
      formData.append(key, _data[key]);
    });

    return this.put(`/categories/update/${id}`, formData);
  };

  public createCategory: (params: {
    parentId: string | null;
    name: string;
    isSub: boolean;
    uploadfile: File;
  }) => Promise<CategoryResponse> = params => {
    const formData = new FormData();
    const _data = {
      ...params,
      subCategory: params.isSub ? 1 : 0,
    };
    Object.keys(_data).forEach(key => {
      formData.append(key, _data[key]);
    });

    return this.post('/categories/create', formData);
  };

  public getUsers: (type: UserType) => Promise<UserCommonResponse[]> = type => {
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

    return this.get(userTypeRouteMap[type]);
  };

  public changeUserStatus: (s: { id: string; status: boolean }) => Promise<any> = ({ id, status }) => {
    if (status) {
      return this.post(`/users/setActive/${id}`);
    }

    return this.post(`/users/setPassive/${id}`);
  };

  public checkHealth: () => Promise<boolean> = () => {
    return axios.get(`${URL}/health`).then(() => true);
  };

  public checkProduct: ({ barcode: string }) => Promise<any> = ({ barcode }) => {
    return this.post(`/products/checkProduct/${barcode}`);
  };

  public getProduct: ({ barcode: string }) => Promise<any> = ({ barcode }) => {
    return this.get(`/products/barcode/${barcode}`);
  };

  public createProduct: (s: {
    barcode: string;
    categoryId: string;
    name: string;
    status?: boolean;
    tax: number;
    uploadfile: File;
  }) => Promise<any> = params => {
    const formData = new FormData();
    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });

    return this.post('/products/create', formData);
  };
}

export default new ApiService();
