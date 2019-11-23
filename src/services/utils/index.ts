/* eslint-disable @typescript-eslint/no-explicit-any */
import { narrowObject, getKeyByValue, objectKeys } from '~/utils';
import { EndpointsVariablesType } from '../helpers';
import { RefetchQuery } from '../mutation-context/helpers';
import { queryEndpoints } from '../query-context/query-endpoints';

const getRouteId = (route: string, variables?: Record<string, any>) => route + JSON.stringify(narrowObject(variables));
const getRouteByEndpoint = (queries: any, query: any) => {
  return getKeyByValue(queries, query);
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
function deepMergeIdObjects(cache: any, newData: any) {
  const modifiedData = {};
  objectKeys(newData).forEach(id => {
    modifiedData[id] = { ...cache[id], ...newData[id] };
  });

  return { ...cache, ...modifiedData };
}

export { getRouteId, getRouteByEndpoint, refetchFactory, deepMergeIdObjects };
