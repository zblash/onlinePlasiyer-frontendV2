import { ApiCall } from '~/services/api';
import { IProductResponse, ISpecifyProductResponse, Invoice, IOrder } from '~/services/helpers/backend-models';

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

  getAllProducts: (variables: { pageNumber: number }) => Promise<IProductResponse> = ({ pageNumber }) =>
    paginationQueryGet(`/products`, { pageNumber });

  getAllProductsByCategoryId: (s: { categoryId: string; pageNumber: number }) => Promise<IProductResponse> = ({
    categoryId,
    pageNumber,
  }) => paginationQueryGet(`/products/category/${categoryId}`, { pageNumber });

  getAllInvoices: (s: { pageNumber: number }) => Promise<Invoice> = ({ pageNumber }) =>
    paginationQueryGet('/invoices', { pageNumber });

  getAllOrders: (s: { pageNumber: number }) => Promise<IOrder> = ({ pageNumber }) =>
    paginationQueryGet('/orders', { pageNumber });

  getAllSpecifies: (s: { userId?: string; pageNumber: number }) => Promise<ISpecifyProductResponse> = ({
    userId,
    pageNumber,
  }) => {
    if (userId) {
      return paginationQueryGet(`/products/specify/byUser/${userId}`, { pageNumber });
    }

    return paginationQueryGet('/products/specify', { pageNumber });
  };
}

const paginationQueryEndpoints = new QueryEndpoints();

export { paginationQueryEndpoints };
