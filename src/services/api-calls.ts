import axios from 'axios';
import { getToken } from '~/services';

export const URL = 'http://localhost:8080';
const API_URL = `${URL}/api`;

export class ApiCall {
  static post = <R = any>(route: string, params = {}) =>
    axios
      .post(API_URL + route, params, {
        headers: {
          Authorization: getToken(),
          'Content-Type': 'application/json',
        },
      })
      .then(d => d.data) as Promise<R>;

  static get = <R = any>(route: string, params = {}) =>
    axios
      .get(API_URL + route, {
        headers: {
          Authorization: getToken(),
          'Content-Type': 'application/json',
        },
        params,
      })
      .then(d => d.data) as Promise<R>;

  static delete = <R = any>(route: string, params: {} = {}) =>
    axios
      .delete(API_URL + route, {
        params,
        headers: {
          Authorization: getToken(),
          'Content-Type': 'application/json',
        },
      })
      .then(d => d.data) as Promise<R>;

  static put = <R = any>(route: string, params: {}) =>
    axios
      .put(API_URL + route, params, {
        headers: {
          Authorization: getToken(),
          'Content-Type': 'application/json',
        },
      })
      .then(d => d.data) as Promise<R>;
}