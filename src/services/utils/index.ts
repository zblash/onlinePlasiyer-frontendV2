/* eslint-disable @typescript-eslint/no-explicit-any */
import { isObject, isArray, narrowObject, getKeyByValue } from '~/utils';
import { EndpointsVariablesType } from '../helpers';
import { RefetchQuery } from '../mutation-context/helpers';
import { queryEndpoints } from '../query-context/query-endpoints';

const getRouteId = (route: string, variables?: Record<string, any>) => route + JSON.stringify(narrowObject(variables));
const getRouteByEndpoint = (queries: any, query: any) => {
  return getKeyByValue(queries, query);
};

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

// [hooks] replace to callback usememo and move services hooks
function refetchFactory<T>(query: T, variables: Omit<EndpointsVariablesType<T>, 'pageNumber'>): RefetchQuery<T> {
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    query,
    variables,
    type: getRouteByEndpoint(queryEndpoints, query) ? 'normal' : 'pagination',
  };
}

export { getRouteId, getRouteByEndpoint, refetchFactory };
