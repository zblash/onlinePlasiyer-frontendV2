/* eslint-disable @typescript-eslint/no-explicit-any */

import { isObject, isArray, narrowObject } from '~/utils';
import { RouteSchema } from './helpers';

const getRouteId = (route: string, variables?: Record<string, any>) => route + JSON.stringify(narrowObject(variables));

const CURRENT_ID_KEY = 'id';

export const separatingObjectsContainingId = (unmodifiedData: any) => {
  let modifiedData: Record<string, any> = {};

  if (isArray(unmodifiedData)) {
    (unmodifiedData as any[]).forEach(nestedUnmodifiedData => {
      modifiedData = { ...modifiedData, ...separatingObjectsContainingId(nestedUnmodifiedData) };
    });
  } else if (isObject(unmodifiedData) && unmodifiedData[CURRENT_ID_KEY]) {
    const unmodifiedDataId = unmodifiedData[CURRENT_ID_KEY];
    modifiedData[unmodifiedDataId] = modifiedData[unmodifiedDataId] || {};
    Object.keys(unmodifiedData).forEach(key => {
      const dataField = unmodifiedData[key];
      if (isObject(dataField) || isArray(dataField)) {
        const nestedModifiedData = separatingObjectsContainingId(dataField);
        if (nestedModifiedData) {
          modifiedData = { ...modifiedData, ...nestedModifiedData };
        } else {
          modifiedData[unmodifiedDataId][key] = dataField;
        }
      } else {
        modifiedData[unmodifiedDataId][key] = dataField;
      }
    });
  } else {
    return null;
  }

  return modifiedData;
};

function getRouteResponseSchema(obj: any, id?: string): RouteSchema | RouteSchema[] {
  if (typeof obj !== 'object') {
    return null;
  }
  if (!obj.id && !id && !isArray(obj)) {
    return null;
  }

  let route: RouteSchema | RouteSchema[];
  if (isArray(obj)) {
    route = [];
    (obj as any[]).forEach(value => {
      const cacheItem = getRouteResponseSchema(value);
      if (cacheItem) {
        (route as RouteSchema[]).push(cacheItem as RouteSchema);
      }
    });
  } else {
    const _id = obj.id || id;
    route = {
      id: _id,
    };
    const _route = route as RouteSchema;
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (isArray(value)) {
        const newRoute = [];
        const cacheMap = (value as any[]).map(val => {
          const r = getRouteResponseSchema(val);

          return r;
        });
        const isWritableData = cacheMap.reduce((prev, val) => {
          return val !== null && prev;
        }, true);
        if (isWritableData) {
          cacheMap.forEach(newCache => {
            newRoute.push(newCache);
          });
          _route.props = { ..._route.props, [key]: newRoute };
        }
      } else if (isObject(value)) {
        const _key = `${_id}.${key}`;
        const newCache = getRouteResponseSchema(value, _key);
        _route.props = { ..._route.props, [key]: newCache };
      }
    });
  }

  return route;
}

export { getRouteId, getRouteResponseSchema };