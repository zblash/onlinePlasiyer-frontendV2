import { ApiCall } from '~/services/api';
import {
  IProductResponse,
  ISpecifyProductResponse,
  Invoice,
  IOrder,
  IAnnouncement,
  ICreditResponse,
  ITicketResponse,
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
  }) => Promise<ISpecifyProductResponse> = ({ productId, pageNumber }) =>
    paginationQueryGet(`/products/${productId}/specifies`, { pageNumber });

  getAllProducts: (variables: {
    pageNumber: number;
    sortBy?: string;
    sortType?: string;
  }) => Promise<IProductResponse> = ({ pageNumber, sortBy, sortType }) =>
    paginationQueryGet(`/products`, { pageNumber, sortBy, sortType });

  getAllProductsByCategoryId: (s: { categoryId: string; pageNumber: number }) => Promise<IProductResponse> = ({
    categoryId,
    pageNumber,
  }) => paginationQueryGet(`/products/category/${categoryId}`, { pageNumber });

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
}

const paginationQueryEndpoints = new QueryEndpoints();

export { paginationQueryEndpoints };
