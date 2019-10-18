import axios from 'axios';
import { getToken } from '~/services';

export const URL = 'https://onlineplasiyer-backend.herokuapp.com';
const API_URL = `${URL}/api`;

export class ApiCall {
  public static post = <R = any>(route: string, params = {}) =>
    axios
      .post(API_URL + route, params, {
        headers: {
          Authorization: getToken(),
          'Content-Type': 'application/json',
        },
      })
      .then(d => d.data) as Promise<R>;

  public static get = <R = any>(route: string, params = {}) =>
    axios
      .get(API_URL + route, {
        headers: {
          Authorization: getToken(),
          'Content-Type': 'application/json',
        },
        params,
      })
      .then(d => d.data) as Promise<R>;

  public static delete = <R = any>(route: string, params: {} = {}) =>
    axios
      .delete(API_URL + route, {
        params,
        headers: {
          Authorization: getToken(),
          'Content-Type': 'application/json',
        },
      })
      .then(d => d.data) as Promise<R>;

  public static put = <R = any>(route: string, params: {}) =>
    axios
      .put(API_URL + route, params, {
        headers: {
          Authorization: getToken(),
          'Content-Type': 'application/json',
        },
      })
      .then(d => d.data) as Promise<R>;
}
