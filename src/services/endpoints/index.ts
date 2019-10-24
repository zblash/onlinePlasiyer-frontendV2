import { QueryEndpoints } from './query-endpoints';
import { MutationEndpoints } from './mutation-endpoints';

const mutationEndPoints = new MutationEndpoints();

const queryEndpoints = new QueryEndpoints();

export { queryEndpoints, mutationEndPoints };

// TODO: remove window object
// @ts-ignore
window.queryEndpoints = queryEndpoints;
