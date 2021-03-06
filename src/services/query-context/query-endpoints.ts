import axios from 'axios';
import { ApiCall, URL } from '~/services/api';
import {
  ICategoryResponse,
  IProductResponse,
  ICardResponse,
  IUserCommonResponse,
  IAddressStateResponse,
  IAddressCityResponse,
  UserRoleResponse,
  IObligationTotals,
  IAnnouncement,
  IOrder,
  Invoice,
  IOrderSummary,
  ISpecifyProductResponse,
  INotificationResponse,
  IPaymentMethodsResponse,
  ICreditResponse,
  ITicketResponse,
  ITicketReplyResponse,
  IUserCreditResponse,
} from '~/services/helpers/backend-models';
import { UserType } from '../helpers/maps';

export type GetCategoriesVariables = { type: 'sub' | 'parent' | 'all' };

class QueryEndpoints {
  getCategories: (s: GetCategoriesVariables) => Promise<ICategoryResponse[]> = ({ type }) =>
    ApiCall.get(`/categories`, {
      filter: type !== 'all',
      sub: type === 'sub',
    });

  getParentCategories: () => Promise<ICategoryResponse[]> = () =>
    ApiCall.get(`/categories`, {
      filter: true,
      sub: false,
    });

  getSubCategoriesByParentId: (s: { parentId: string }) => Promise<ICategoryResponse[]> = ({ parentId }) =>
    ApiCall.get(`/categories/${parentId}/subCategories`);

  getCategoryByID: (s: { id: string }) => Promise<ICategoryResponse> = ({ id }) => ApiCall.get(`/categories/${id}`);

  getProductByBarcode: (s: { barcode: string }) => Promise<IProductResponse> = ({ barcode }) =>
    ApiCall.get(`/products/barcode/${barcode}`);

  getProductById: (s: { id: string }) => Promise<IProductResponse> = ({ id }) => ApiCall.get(`/products/${id}`);

  getProductSpecifyById: (s: { id: string }) => Promise<ISpecifyProductResponse> = ({ id }) =>
    ApiCall.get(`/products/specify/${id}`);

  getCard: () => Promise<ICardResponse> = () => ApiCall.get(`/cart`);

  getUsers: (s: { role: UserRoleResponse; type: UserType }) => Promise<IUserCommonResponse[]> = ({ type, role }) => {
    const userTypeRouteMap: Record<UserRoleResponse, Record<UserType, string>> = {
      CUSTOMER: {
        active: '/admin/users/customer?status=true',
        all: '/admin/users/customer',
        passive: '/admin/users/customer?status=false',
      },
      MERCHANT: {
        active: '/admin/users/merchant?status=true',
        passive: '/admin/users/merchant?status=false',
        all: '/admin/users/merchant',
      },
      ADMIN: {
        active: '/admin/users/admin?status=true',
        passive: '/admin/users/admin?status=false',
        all: '/admin/users/admin',
      },
    };

    return ApiCall.get(userTypeRouteMap[role][type]);
  };

  getMerchants: () => Promise<IUserCommonResponse[]> = () => ApiCall.get('/merchants');

  getCustomers: () => Promise<IUserCommonResponse[]> = () => ApiCall.get('/customers');

  getAuthUserActiveStates: () => Promise<IAddressStateResponse[]> = () => ApiCall.get('/user/activeStates');

  getCities: () => Promise<IAddressCityResponse[]> = () =>
    axios.get(URL.concat('/definitions/cities')).then(({ data }) => data);

  getStatesByCityId: (s: { cityId: string }) => Promise<IAddressStateResponse[]> = ({ cityId }) =>
    axios.get(URL.concat(`/definitions/cities/${cityId}/states`)).then(({ data }) => data);

  getStates: () => Promise<any> = () => axios.get(URL.concat('/definitions/states')).then(({ data }) => data);

  getObligationTotal: (s: { id?: string }) => Promise<IObligationTotals> = ({ id }) => {
    if (id) {
      return ApiCall.get(`/obligations/totals/byuser/${id}`);
    }

    return ApiCall.get('/obligations/totals');
  };

  getAnnouncements: () => Promise<Array<IAnnouncement>> = () => ApiCall.get('/announcements');

  getOrder: (s: { id: string }) => Promise<IOrder> = ({ id }) => ApiCall.get(`/orders/${id}`);

  getInvoice: (s: { id: string }) => Promise<Invoice> = ({ id }) => ApiCall.get(`/invoices/${id}`);

  getOrderSummary: () => Promise<IOrderSummary> = () => ApiCall.get('/orders/summary');

  getUserInfosForAdmin: (s: { id: string }) => Promise<IUserCommonResponse> = ({ id }) =>
    ApiCall.get(`/admin/users/info/${id}`);

  getAllNotifications: () => Promise<Array<INotificationResponse>> = () => ApiCall.get('/notifications');

  getAllUsersNotifications: () => Promise<Array<INotificationResponse>> = () => ApiCall.get('/notifications/my');

  getAllUsers: () => Promise<Array<IUserCommonResponse>> = () => ApiCall.get('/users');

  getPaymentMethods: () => Promise<Array<IPaymentMethodsResponse>> = () => ApiCall.get('/payment/methods');

  getCredit: (s: { id?: string }) => Promise<ICreditResponse> = ({ id }) => {
    if (id) {
      return ApiCall.get(`/admin/credits/byUser/${id}`);
    }

    return ApiCall.get('/credits/my');
  };

  getProductsByFilter: (s: { name: string }) => Promise<Array<IProductResponse>> = ({ name }) =>
    ApiCall.get(`/products/filter?name=${name}`);

  getTicketById: (s: { id: string }) => Promise<ITicketResponse> = ({ id }) => ApiCall.get(`/tickets/${id}`);

  getTicketRepliesByTicketId: (s: { id: string }) => Promise<Array<ITicketReplyResponse>> = ({ id }) =>
    ApiCall.get(`/tickets/${id}/replies`);

  getAllProducts: (s: { userId?: string }) => Promise<Array<IProductResponse>> = ({ userId }) => {
    return ApiCall.get('/products/byUser', { userId });
  };

  getUsersCreditByUser: (s: { userId: string }) => Promise<IUserCreditResponse> = ({ userId }) => {
    return ApiCall.get(`/credits/byUser/${userId}`);
  };
}
const queryEndpoints = new QueryEndpoints();

export { queryEndpoints };
