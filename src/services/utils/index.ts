/* eslint-disable @typescript-eslint/no-explicit-any */
import { isObject, isArray, narrowObject, objectKeys, getKeyByValue } from '~/utils';
import { EndpointsVariablesType } from '../helpers';
import { RefetchQuery } from '../mutation-context/helpers';
import { queryEndpoints } from '../query-context/query-endpoints';

const getRouteId = (route: string, variables?: Record<string, any>) => route + JSON.stringify(narrowObject(variables));
const getRouteByEndpoint = (queries: any, query: any) => {
  return getKeyByValue(queries, query);
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

function refetchFactory<T>(query: T, variables: Omit<EndpointsVariablesType<T>, 'pageNumber'>): RefetchQuery<T> {
  return {
    // @ts-ignore
    query,
    variables,
    type: getRouteByEndpoint(queryEndpoints, query) ? 'normal' : 'pagination',
  };
}

async function asyncMap(array: (() => Promise<any>)[]): Promise<any> {
  if (array.length === 0) {
    return Promise.resolve();
  }
  if (array.length === 1) {
    return array[0]();
  }
  for (let index = 0; index < array.length; index++) {
    await array[index]();
  }
  return Promise.resolve();
}

export { getRouteId, getRouteByEndpoint, refetchFactory, asyncMap };
