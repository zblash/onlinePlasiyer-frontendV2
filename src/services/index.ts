import axios from 'axios';
import { ROLE_MAP } from '~/utils/constants';
import { UserResponse, CategoryResponse, OrderResponse } from '~/__types';
const URL = 'http://localhost:8080';
const API_URL = URL + '/api';

type FetchPolicy =
  | 'cache-first'
  | 'cache-and-network'
  | 'network-only'
  | 'cache-only';
class ApiService {
  private token;
  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('_auth');
    }
    return this.token;
  }
  private cache: Record<string, any> = {};
  public getCache() {
    return this.cache;
  }
  public getApiUrl() {
    return URL;
  }

  private get<ResponseType = any>(
    route: string,
    params = {},
    fetchPolicy: FetchPolicy = 'network-only'
  ): Promise<ResponseType> {
    const url = API_URL + route;
    const urlCache = this.cache[route];
    const _get = () =>
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
    params: ParamsType = {} as ParamsType
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
    params: ParamsType = {} as ParamsType
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
  public login(username: string, password: string) {
    return axios
      .post(URL + '/signin', {
        username: username,
        password,
      })
      .then(({ data }) => {
        localStorage.setItem('_auth', `Bearer ${data.token}`);
        return data;
      });
  }
  public logout() {
    localStorage.removeItem('_auth');
  }
  public signup(data: {
    city: string;
    details: string;
    email: string;
    name: string;
    password: string;
    role: keyof typeof ROLE_MAP;
    state: string;
    taxNumber: string;
    username: string;
  }) {
    const _data = {
      ...data,
      roleType: ROLE_MAP[data.role],
      role: undefined,
    };
    return axios.post(URL + '/sign-up', _data).then(d => d.data);
  }

  public getAuthUser: () => Promise<UserResponse> = () => {
    return this.post('/users/getmyinfos');
  };
  public isLoggedIn = () => {
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
  public deleteCategory(id: string) {
    return this.delete(`/admin/categories/delete/${id}`);
  }
  public createCategory(params: any) {
    return this.post('/categories/create', params);
  }
  public getOrders: () => Promise<OrderResponse[]> = () => {
    return this.get('/orders');
  };
  public checkHealth() {
    return axios.get(URL + '/health');
  }
}

export default new ApiService();
