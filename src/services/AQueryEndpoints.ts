// import axios from 'axios';
// import { ApiCall, URL } from './api-calls';
// import { UserType, CategoryResponse } from '~/__types';

// interface AQueryEndpoints {
//    getCategories: () => Promise<CategoryResponse[]>;

//   getCategoryByID: (s: { id: string }) => Promise<CategoryResponse[]>;

//   // getProductByBarcode:(s:{barcode:string})=>Promise<>

//   getUsers = ({ type }: { type: UserType }) => {
//     const userTypeRouteMap: Record<UserType, string> = {
//       'customers-active': '/users/customers/active',
//       'customers-all': '/users/customers/',
//       'customers-passive': '/users/customers/passive',
//       'merchants-active': '/users/merchant/active',
//       'merchants-passive': '/users/merchant/passive',
//       'merchants-all': '/users/merchant/',
//     };
//     if (!Object.keys(userTypeRouteMap).includes(type)) {
//       return Promise.reject(new Error('Type is not found'));
//     }

//     return ApiCall.get(userTypeRouteMap[type]);
//   };

//   getAuthUser = () => ApiCall.get('/users/getmyinfos');

//   checkHealth = () => axios.get(URL.concat('/health')).then(() => ({ id: 'he', status: true }));
// }
