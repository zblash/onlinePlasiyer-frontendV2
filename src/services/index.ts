export { mutationEndPoints, queryEndpoints } from './endpoints';

export const getToken = () => {
  return localStorage.getItem('_auth');
};
