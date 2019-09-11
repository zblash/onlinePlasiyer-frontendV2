// import axios from 'axios';
// import { ROLE_MAP } from '~/utils/constants';

// class ApiService {
//   public login = (username: string, password: string) => {
//     return axios
//       .post(`${URL}/signin`, {
//         username,
//         password,
//       })
//       .then(({ data }) => {
//         localStorage.setItem('_auth', `Bearer ${data.token}`);

//         return data;
//       });
//   };

//   public logout(): void {
//     localStorage.removeItem('_auth');
//   }

//   public signup = (data: {
//     city: string;
//     details: string;
//     email: string;
//     name: string;
//     password: string;
//     role: keyof typeof ROLE_MAP;
//     state: string;
//     taxNumber: string;
//     username: string;
//   }) => {
//     const _data = {
//       ...data,
//       roleType: ROLE_MAP[data.role],
//       role: undefined,
//     };

//     return axios.post(`${URL}/sign-up`, _data).then(d => d.data);
//   };
// }

// export default new ApiService();

export { mutationEndPoints, queryEndpoints } from './endpoints';

export const getToken = () => {
  return localStorage.getItem('_auth');
};
