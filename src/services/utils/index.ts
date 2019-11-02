/* eslint-disable @typescript-eslint/no-explicit-any */
import { isObject, isArray, narrowObject, objectKeys, getKeyByValue } from '~/utils';
import { EndpointsVariablesType } from '../helpers';

const getRouteId = (route: string, variables?: Record<string, any>) => route + JSON.stringify(narrowObject(variables));
const getRouteByEndpoint = (queries: any, query: any) => {
  const route = getKeyByValue(queries, query);

  if (!route) {
    throw new Error(`Endpoint Bulunamadi`);
  }

  return route;
};

const CURRENT_ID_KEY = 'id';

export function deepMergeIdObjects(cache: any, newData: any) {
  const modifiedData = {};
  objectKeys(newData).forEach(id => {
    modifiedData[id] = { ...cache[id], ...newData[id] };
  });

  return modifiedData;
}

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

function refetchFactory<T>(query: T, variables: EndpointsVariablesType<T>) {
  return {
    query,
    variables,
  };
}

export { getRouteId, getRouteByEndpoint, refetchFactory };
