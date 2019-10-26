import { TOKEN_KEY } from '~/utils/constants';

export { mutationEndPoints, queryEndpoints } from './endpoints';

// TODO: remove function after enpoints move to react context
export const getToken = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY));
};
