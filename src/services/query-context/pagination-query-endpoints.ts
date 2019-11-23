import { ApiCall } from '~/services/api';
import { IProductResponse, ISpecifyProductResponse, Invoice, IOrder } from '~/services/helpers/backend-models';

class QueryEndpoints {
  getAllSpecifyProductsByProductId: (s: {
    productId: string;
    pageNumber: number;
  }) => Promise<ISpecifyProductResponse> = ({ productId, pageNumber }) =>
    ApiCall.get(`/products/specify/product/${productId}`, { pageNumber });

  getAllProducts: (variables: { pageNumber: number }) => Promise<IProductResponse> = ({ pageNumber }) =>
    ApiCall.get(`/products`, { pageNumber });

  getAllProductsByCategoryId: (s: { categoryId: string; pageNumber: number }) => Promise<IProductResponse> = ({
    categoryId,
    pageNumber,
  }) => ApiCall.get(`/products/category/${categoryId}`, { pageNumber });

  getAllInvoices: (s: { pageNumber: number }) => Promise<Invoice> = ({ pageNumber }) =>
    ApiCall.get('/invoices', { pageNumber });

  getAllOrders: (s: { pageNumber: number }) => Promise<IOrder> = ({ pageNumber }) =>
    ApiCall.get('/orders', { pageNumber });
}
const paginationQueryEndpoints = new QueryEndpoints();

export { paginationQueryEndpoints };
