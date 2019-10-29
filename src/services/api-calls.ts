import axios from 'axios';
import { TOKEN } from './utils';

export const URL = 'https://onlineplasiyer-backend.herokuapp.com';
const API_URL = `${URL}/api`;

const headers = () => ({
  Authorization: TOKEN.get(),
  'Content-Type': 'application/json',
});
export class ApiCall {
  static post = (route: string, params = {}) =>
    axios
      .post(API_URL + route, params, {
        headers: headers(),
      })
      .then(d => d.data);

  static get = (route: string, params = {}) =>
    axios
      .get(API_URL + route, {
        headers: headers(),
        params,
      })
      .then(d => d.data);

  static delete = (route: string, params: {} = {}) =>
    axios
      .delete(API_URL + route, {
        params,
        headers: headers(),
      })
      .then(d => d.data);

  static put = (route: string, params: any) =>
    axios
      .put(API_URL + route, params, {
        headers: headers(),
      })
      .then(d => d.data);
}
