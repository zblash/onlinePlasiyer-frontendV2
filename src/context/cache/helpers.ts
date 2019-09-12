import { isArray, narrowObject, isObject } from '~/utils';
import { queryEndpoints, mutationEndPoints } from '~/services';
import { ICacheHelperResponse, IRouteCache } from '.';

function cacheHelper(obj: any, id?: string): ICacheHelperResponse {
  let cache = {};
  if (typeof obj !== 'object') {
    return null;
  }
  if (!obj.id && !id && !isArray(obj)) {
    return null;
  }

  let route: ICacheHelperResponse['route'];
  if (isArray(obj)) {
    route = [];
    (obj as any[]).forEach(value => {
      const cacheItem = cacheHelper(value);
      if (cacheItem) {
        cache = { ...cache, ...cacheItem.cache };
        (route as IRouteCache[]).push(cacheItem.route as IRouteCache);
      }
    });
  } else {
    const _id = obj.id || id;
    route = {
      id: _id,
    };
    const _route = route as IRouteCache;
    cache[_id] = cache[_id] || {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (isArray(value)) {
        const newRoute = [];
        const cacheMap = (value as any[]).map(val => {
          const r = cacheHelper(val);

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
          _route.props = { ..._route.props, [key]: newRoute };
        } else {
          cache[_id][key] = value;
        }
      } else if (isObject(value)) {
        const _key = `${_id}.${key}`;
        const newCache = cacheHelper(value, _key);
        cache = {
          ...cache,
          ...newCache.cache,
        };
        _route.props = { ..._route.props, [key]: newCache.route };
      } else {
        cache[_id][key] = value;
      }
    });
  }

  return { cache, route };
}

const getRouteId = (route: string, variables?: Record<string, any>) => route + JSON.stringify(narrowObject(variables));

export type QueryEndpoints = keyof typeof queryEndpoints;

export type MutationEndpoints = keyof typeof mutationEndPoints;

export type FetchPolicy = 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only';

export { cacheHelper, getRouteId };