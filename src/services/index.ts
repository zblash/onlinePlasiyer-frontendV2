import axios from 'axios';
const URL = 'http://localhost:8080';

type FetchPolicy =
  | 'cache-first'
  | 'cache-and-network'
  | 'network-only'
  | 'cache-only';
class ApiService {
  public getToken(): string {
    return `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
  }
  private cache: Record<string, any> = {};
  public getCache() {
    return this.cache;
  }
  public getApiUrl() {
    return URL;
  }

  public get<ResponseType = any>(
    route: string,
    fetchPolicy: FetchPolicy = 'cache-first',
    params = {}
  ): Promise<ResponseType> {
    const url = URL + '/api' + route;
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
  public post<ResponseType = any, ParamsType = any>(
    route: string,
    params: ParamsType
  ): Promise<ResponseType> {
    return axios
      .post(URL + route, params, {
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
        userName: username,
        password,
      })
      .then(({ data }) => {
        localStorage.setItem('user', JSON.stringify(data));
        return data;
      });
  }
}

export default new ApiService();
