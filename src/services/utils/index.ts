/* eslint-disable @typescript-eslint/no-explicit-any */
import { narrowObject, getKeyByValue, objectKeys } from '~/utils/index';
import { EndpointsVariablesType } from '../helpers/index';
import { RefetchQuery } from '../mutation-context/helpers';
import { queryEndpoints } from '../query-context/query-endpoints';
import { paginationQueryEndpoints } from '../query-context/pagination-query-endpoints';
import { QueryHandlerParams } from '../query-context/helpers';
import { SeperatedData } from './route-schema';

const getRouteId = (query: QueryHandlerParams['query'], variables?: Record<string, any>) =>
  getRouteByEndpoint({ ...queryEndpoints, ...paginationQueryEndpoints }, query) +
  JSON.stringify(narrowObject(variables));
const getRouteByEndpoint = (queries: any, query: any) => {
  return getKeyByValue(queries, query);
};

// [hooks] replace to callback usememo and move services hooks
function refetchFactory<T>(
  query: T,
  variables: Omit<EndpointsVariablesType<T>, 'pageNumber'> = null,
  chain = false,
): RefetchQuery<T> {
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    query,
    variables: { ...variables },
    type: chain ? 'chain' : getRouteByEndpoint(queryEndpoints, query) ? 'normal' : 'pagination',
  };
}
function deepMergeIdObjects(cache: SeperatedData, newData: SeperatedData): SeperatedData {
  const modifiedData = {};
  objectKeys(newData).forEach(id => {
    modifiedData[id] = { ...cache[id], ...newData[id] };
  });

  return { ...cache, ...modifiedData };
}

export { getRouteId, getRouteByEndpoint, refetchFactory, deepMergeIdObjects };
