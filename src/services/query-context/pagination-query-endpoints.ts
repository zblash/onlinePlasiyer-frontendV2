import { ApiCall } from '~/services/api';
import { IProductResponse, ISpecifyProductResponse, Invoice, IOrder } from '~/services/helpers/backend-models';
import { PaginationResult } from './helpers';

class QueryEndpoints {
  getAllSpecifyProductsByProductId: (s: {
    productId: string;
    pageNumber: number;
  }) => Promise<PaginationResult<ISpecifyProductResponse>> = ({ productId, pageNumber }) =>
    ApiCall.get(`/products/specify/product/${productId}`, { pageNumber });

  getAllProducts: (variables: { pageNumber: number }) => Promise<PaginationResult<IProductResponse>> = ({
    pageNumber,
  }) => ApiCall.get(`/products`, { pageNumber });

  getAllProductsByCategoryId: (s: {
    categoryId: string;
    pageNumber: number;
  }) => Promise<PaginationResult<IProductResponse>> = ({ categoryId, pageNumber }) =>
    ApiCall.get(`/products/category/${categoryId}`, { pageNumber });

  getAllInvoices: (s: { pageNumber: number }) => Promise<PaginationResult<Invoice>> = ({ pageNumber }) =>
    ApiCall.get('/invoices', { pageNumber });

  getAllOrders: (s: { pageNumber: number }) => Promise<PaginationResult<IOrder>> = ({ pageNumber }) =>
    ApiCall.get('/orders', { pageNumber });
}
const paginationQueryEndpoints = new QueryEndpoints();

export { paginationQueryEndpoints };
