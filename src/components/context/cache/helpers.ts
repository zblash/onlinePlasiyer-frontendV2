import axios from 'axios';
import { isArray, narrowObject, isObject } from '~/utils';
import { UserType } from '~/__types';

const URL = 'http://localhost:8080';

export const getToken = () => {
  return localStorage.getItem('_auth');
};

function cacheHelper(obj: any, _cache: any, id?: string) {
  let cache = { ..._cache };
  if (typeof obj !== 'object') {
    return null;
  }
  if (!obj.id && !id && !isArray(obj)) {
    return null;
  }

  let route;
  if (isArray(obj)) {
    route = [];
    (obj as any[]).forEach(value => {
      const cacheItem = cacheHelper(value, cache);
      if (cacheItem) {
        cache = { ...cache, ...cacheItem.cache };
        route.push(cacheItem.route);
      }
    });
  } else {
    const _id = obj.id || id;
    route = {
      id: _id,
    };
    cache[_id] = cache[_id] || {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (isArray(value)) {
        const newRoute = [];
        const cacheMap = (value as any[]).map(val => {
          const r = cacheHelper(val, cache);

          return r;
        });
        const isWritableData = cacheMap.reduce((prev, val) => {
          return val !== null && prev;
        }, true);
        if (isWritableData) {
          cacheMap.forEach(newCache => {
            cache = { ...cache, ...newCache.cache };
            newRoute.push(newCache.route);
          });

          route.props = { ...route.props, [key]: newRoute };
        } else {
          cache[_id][key] = value;
        }
      } else if (isObject(value)) {
        const _key = `${_id}.${key}`;
        const newCache = cacheHelper(value, cache, _key);
        cache = {
          ...cache,
          ...newCache.cache,
        };
        route.props = { ...route.props, [key]: newCache.route };
      } else {
        cache[_id][key] = value;
      }
    });
  }

  return { cache, route };
}

const getRouteId = (route: string, variables?: Record<string, any>) => route + JSON.stringify(narrowObject(variables));

const call = {
  post: <R = any>(route: string, params = {}) =>
    axios
      .post(URL + route, params, {
        headers: {
          Authorization: getToken(),
          'Content-Type': 'application/json',
        },
      })
      .then(d => d.data) as Promise<R>,

  get: <R = any>(route: string, params = {}) =>
    axios
      .get(URL + route, {
        headers: {
          Authorization: getToken(),
          'Content-Type': 'application/json',
        },
        params,
      })
      .then(d => d.data) as Promise<R>,
  delete: <R = any>(route: string, params: {}) =>
    axios
      .delete(URL + route, {
        params,
        headers: {
          Authorization: getToken(),
          'Content-Type': 'application/json',
        },
      })
      .then(d => d.data) as Promise<R>,
  put: <R = any>(route: string, params: {}) =>
    axios
      .put(URL + route, params, {
        headers: {
          Authorization: getToken(),
          'Content-Type': 'application/json',
        },
      })
      .then(d => d.data) as Promise<R>,
};

interface UsersVariables {
  type: UserType;
}

interface ProductsBarcodeVariables {
  barcode: string;
}

const queryEndpoints = {
  '/categories': () => call.get('/categories'),
  '/categories?filter=true&sub=false': () => call.get('/categories?filter=true&sub=false'),
  '/products/barcode/': ({ barcode }: ProductsBarcodeVariables) => call.get(`/products/barcode/${barcode}`),
  '/users': ({ type }: UsersVariables) => {
    const userTypeRouteMap: Record<UserType, string> = {
      'customers-active': '/api/users/customers/active',
      'customers-all': '/api/users/customers/',
      'customers-passive': '/api/users/customers/passive',
      'merchants-active': '/api/users/merchant/active',
      'merchants-passive': '/api/users/merchant/passive',
      'merchants-all': '/api/users/merchant/',
    };
    if (!Object.keys(userTypeRouteMap).includes(type)) {
      return Promise.reject(new Error('Type is not found'));
    }

    return call.get(userTypeRouteMap[type]);
  },
  '/users/getmyinfos': () => call.get('/api/users/getmyinfos'),
  '/health': () => call.get('/health').then(() => ({ id: 'health__check', status: true })),
};

export type QueryEndpoints = keyof typeof queryEndpoints;

export type FetchPolicy = 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only';

export { cacheHelper, getRouteId, call, queryEndpoints };
