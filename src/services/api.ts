/* eslint-disable import/extensions */
import axios from 'axios';
import { TOKEN_KEY } from '~/utils/constants';
import { UserRoleResponse } from './helpers/backend-models';

export const TOKEN = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  remove: () => localStorage.removeItem(TOKEN_KEY),
};

export const URL = 'http://localhost:8080';
const API_URL = `${URL}/api`;

const headers = () => ({
  Authorization: TOKEN.get(),
  'Content-Type': 'application/json',
  'Accept-Language': 'tr',
});
const ApiCall = {
  post: (route: string, params = {}) =>
    axios
      .post(API_URL + route, params, {
        headers: headers(),
      })
      .then(d => d.data),

  get: (route: string, params = {}) =>
    axios
      .get(API_URL + route, {
        headers: headers(),
        params,
      })
      .then(d => d.data),

  delete: (route: string, params: {} = {}) =>
    axios
      .delete(API_URL + route, {
        params,
        headers: headers(),
      })
      .then(d => d.data),

  put: (route: string, params: any) =>
    axios
      .put(API_URL + route, params, {
        headers: headers(),
      })
      .then(d => d.data),
};

function login(username: string, password: string) {
  return axios.post(`${URL}/signin`, { username, password }).then(({ data }) => {
    TOKEN.set(`Bearer ${data.token}`);
    // eslint-disable-next-line
    location.replace('/');

    return data;
  });
}
function signup(data: {
  cityId: string;
  stateId: string;
  details: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRoleResponse;
  taxNumber: string;
}) {
  const _data = {
    ...data,
    roleType: data.role,
  };

  delete _data.role;

  return axios.post(`${URL}/sign-up`, _data).then(d => d.data);
}

function logout() {
  TOKEN.remove();
  // eslint-disable-next-line
  location.replace('/');
}
const hasToken = !!TOKEN.get();

export { ApiCall, login, logout, hasToken, signup };
