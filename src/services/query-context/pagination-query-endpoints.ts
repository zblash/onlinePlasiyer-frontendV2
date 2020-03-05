import { ApiCall } from '~/services/api';
import {
  IProductResponse,
  ISpecifyProductResponse,
  Invoice,
  IOrder,
  IAnnouncement,
  ICreditResponse,
  ITicketResponse,
  ICreditActivityResponse,
  IObligationActivityResponse,
  IObligationTotals,
} from '~/services/helpers/backend-models';

function paginationQueryGet(route: string, variables: any) {
  return ApiCall.get(route, variables).then(data => ({
    ...data,
    values: data.values.map(item => ({ ...item, pageIndex: variables.pageNumber })),
  }));
}

class QueryEndpoints {
  getAllSpecifyProductsByProductId: (s: {
    productId: string;
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
    userId?: string;
  }) => Promise<ISpecifyProductResponse> = ({ productId, pageNumber, userId, sortBy, sortType }) =>
    paginationQueryGet(`/products/${productId}/specifies`, { pageNumber, userId, sortBy, sortType });

  getAllProducts: (variables: {
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
    userId?: string;
    categoryId?: string;
  }) => Promise<IProductResponse> = ({ pageNumber, sortBy, sortType, userId }) =>
    paginationQueryGet(`/products`, { pageNumber, sortBy, sortType, userId });

  getAllProductsByCategoryId: (s: {
    categoryId: string;
    pageNumber: number;
    userId?: string;
  }) => Promise<IProductResponse> = ({ categoryId, pageNumber, userId }) =>
    paginationQueryGet(`/products/category/${categoryId}`, { pageNumber, userId });

  getAllInvoices: (s: { userId?: string; pageNumber: number }) => Promise<Invoice> = ({ userId, pageNumber }) => {
    if (userId) {
      return paginationQueryGet(`/invoices/byUser/${userId}`, { pageNumber });
    }

    return paginationQueryGet('/invoices', { pageNumber });
  };

  getAllOrders: (s: { userId?: string; pageNumber: number; sortBy?: string; sortType?: string }) => Promise<IOrder> = ({
    userId,
    pageNumber,
    sortBy,
    sortType,
  }) => {
    if (userId) {
      return paginationQueryGet(`/orders/byUser/${userId}`, { pageNumber, sortBy, sortType });
    }

    return paginationQueryGet('/orders', { pageNumber, sortBy, sortType });
  };

  getAllSpecifies: (s: {
    productId?: string;
    userId?: string;
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
  }) => Promise<ISpecifyProductResponse> = ({ userId, pageNumber, sortBy, sortType }) => {
    if (userId) {
      return paginationQueryGet(`/products/specify/byUser/${userId}`, { pageNumber, sortBy, sortType });
    }

    return paginationQueryGet('/products/specify', { pageNumber, sortBy, sortType });
  };

  getAllAnnouncements: (s: { pageNumber: number }) => Promise<IAnnouncement> = ({ pageNumber }) =>
    paginationQueryGet(`/announcements/all`, { pageNumber });

  getAllCredits: (s: { pageNumber: number; sortBy?: string; sortType?: string }) => Promise<ICreditResponse> = ({
    pageNumber,
    sortBy,
    sortType,
  }) => paginationQueryGet('/credits', { pageNumber, sortBy, sortType });

  getAllTickets: (s: { pageNumber: number; sortBy?: string; sortType?: string }) => Promise<ITicketResponse> = ({
    ...params
  }) => paginationQueryGet('/tickets', params);

  getAllCreditActivities: (s: {
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
  }) => Promise<ICreditActivityResponse> = ({ ...params }) => paginationQueryGet('/credits/activities', params);

  getAllObligationActivities: (s: {
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
    userId?: string;
  }) => Promise<IObligationActivityResponse> = ({ userId, pageNumber, sortBy, sortType }) => {
    if (userId) {
      return paginationQueryGet(`/obligations/activities/byUser/${userId}`, { pageNumber, sortBy, sortType });
    }

    return paginationQueryGet('/obligations/activities', { pageNumber, sortBy, sortType });
  };

  getAllObligations: (s: { pageNumber: number; sortBy?: string; sortType?: string }) => Promise<IObligationTotals> = ({
    pageNumber,
    sortBy,
    sortType,
  }) => {
    return paginationQueryGet('/obligations', { pageNumber, sortBy, sortType });
  };
}

const paginationQueryEndpoints = new QueryEndpoints();

export { paginationQueryEndpoints };
