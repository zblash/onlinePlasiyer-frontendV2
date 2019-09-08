import axios from 'axios';
import { ROLE_MAP } from '~/utils/constants';
import { UserCommonResponse, CategoryResponse, OrderResponse, UserType } from '~/__types';

const URL = 'http://localhost:8080';
const API_URL = `${URL}/api`;

type FetchPolicy = 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only';

class ApiService {
  private token;

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('_auth');
    }

    return this.token;
  }

  private cache: Record<string, any> = {};

  // public getCache() {
  //   return this.cache;
  // }

  private get<ResponseType = any>(
    route: string,
    params = {},
    fetchPolicy: FetchPolicy = 'network-only',
  ): Promise<ResponseType> {
    const url = API_URL + route;
    const urlCache = this.cache[route];
    const _get: () => Promise<ResponseType> = () =>
      axios
        .get(url, {
          headers: {
            Authorization: this.getToken(),
            'Content-Type': 'application/json',
          },
          params,
        })
        .then(d => {
          this.cache[route] = d.data;

          return d.data as ResponseType;
        });
    switch (fetchPolicy) {
      case 'cache-and-network':
        return _get();
      case 'network-only':
        return _get();
      case 'cache-only':
        return urlCache;
      default: {
        if (urlCache) {
          return Promise.resolve(urlCache);
        }

        return _get();
      }
    }
  }

  private post<ResponseType = any, ParamsType = any>(
    route: string,
    // eslint-disable-next-line
    params: ParamsType = {} as ParamsType,
  ): Promise<ResponseType> {
    return axios
      .post(API_URL + route, params, {
        headers: {
          Authorization: this.getToken(),
          'Content-Type': 'application/json',
        },
      })
      .then(d => d.data);
  }

  private delete<ResponseType = any, ParamsType = any>(
    route: string,
    // eslint-disable-next-line
    params: ParamsType = {} as ParamsType,
  ): Promise<ResponseType> {
    return axios
      .delete(API_URL + route, {
        params,
        headers: {
          Authorization: this.getToken(),
          'Content-Type': 'application/json',
        },
      })
      .then(d => d.data);
  }

  private put<ResponseType = any, ParamsType = any>(
    route: string,
    // eslint-disable-next-line
    params: ParamsType = {} as ParamsType,
  ): Promise<ResponseType> {
    return axios
      .put(API_URL + route, params, {
        headers: {
          Authorization: this.getToken(),
          'Content-Type': 'application/json',
        },
      })
      .then(d => d.data);
  }

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
    return this.get('/categories', {
      filter: true,
      sub: false,
    });
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

  public getOrders: () => Promise<OrderResponse[]> = () => {
    return this.get('/orders');
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

  public getCart: () => Promise<any> = () => {
    return this.get('/cart');
  };

  public checkHealth: () => Promise<boolean> = () => {
    return axios.get(`${URL}/health`).then(() => true);
  };
}

export default new ApiService();
