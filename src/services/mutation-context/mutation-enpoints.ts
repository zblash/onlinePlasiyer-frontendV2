import { ApiCall } from '~/services/api';
import {
  ICardResponse,
  UnitTypeResponse,
  IProductResponse,
  IOrder,
  IUserCommonResponse,
  IAddressStateResponse,
  ISpecifyProductResponse,
  UserRoleResponse,
  IUserRegisterResponse,
  TOrderStatus,
  IAnnouncement,
  INotificationResponse,
  ICreditResponse,
  ITicketResponse,
  ITicketReplyResponse,
  PromotionType,
  IOrderConfirmItem,
  IObligationTotals,
} from '~/services/helpers/backend-models';

interface CreateCategoryVariables {
  parentId?: string | null;
  name: string;
  isSub: boolean;
  uploadFile: File;
  commission: number;
}

interface UpdateCategoryVariables {
  id: string;
  parentId?: string | null;
  name: string;
  isSub: boolean;
  uploadFile?: null | File;
  commission?: number;
}

class MutationEndpoints {
  removeCategory: (s: { id: string }) => Promise<any> = ({ id }) => ApiCall.delete(`/categories/${id}`);

  updateCategory = (params: UpdateCategoryVariables) => {
    const formData = new FormData();
    const { id } = params;
    const data = {
      ...params,
      subCategory: params.isSub ? 1 : 0,
      uploadfile: params.uploadFile,
    };

    delete data.isSub;
    delete data.uploadFile;
    delete data.id;

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    return ApiCall.put(`/categories/${id}`, formData);
  };

  createCategory = (params: CreateCategoryVariables) => {
    const formData = new FormData();
    const _data = {
      ...params,
      subCategory: params.isSub ? 1 : 0,
      uploadfile: params.uploadFile,
    };

    delete _data.isSub;
    delete _data.uploadFile;

    Object.keys(_data).forEach(key => {
      formData.append(key, _data[key]);
    });

    return ApiCall.post('/categories', formData);
  };

  changeUserStatus = ({ id, status }: { id: string; status: boolean }) => {
    return ApiCall.post(`/users/status/${id}/${status}`);
  };

  createProduct = (params: {
    barcode: string;
    categoryId: string;
    name: string;
    status?: boolean;
    tax: number;
    uploadedFile?: File;
    commission?: number;
  }) => {
    const formData = new FormData();
    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });

    return ApiCall.post('/products', formData);
  };

  updateProduct = (params: {
    id: string;
    barcode: string;
    categoryId: string;
    name: string;
    status?: boolean;
    tax: number;
    uploadedFile?: File;
    commission?: number;
  }) => {
    const formData = new FormData();
    const { id, ...data } = params;
    Object.keys(data).forEach(key => {
      formData.append(key, params[key]);
    });

    return ApiCall.put(`/products/${id}`, formData);
  };

  hasProduct = (params: { barcode: string }) => {
    return ApiCall.post(`/products/hasProduct/${params.barcode}`).then(data => ({
      id: `has-product-${params.barcode}`,
      hasBarcode: data,
    }));
  };

  addToCard: (s: { specifyProductId: string; quantity: number }) => Promise<ICardResponse> = ({
    specifyProductId,
    quantity,
  }) => ApiCall.post('/cart', { productId: specifyProductId, quantity });

  createSpecifyProductForAuthUser = (params: {
    barcode: string;
    contents: number;
    quantity: number;
    recommendedRetailPrice: number;
    stateIds: string[];
    totalPrice: number;
    unitPrice: number;
    unitType: UnitTypeResponse;
    discount: boolean;
    discountValue?: number;
    discountUnit?: number;
    promotionType?: PromotionType;
    promotionText?: string;
  }) => ApiCall.post('/products/specify', { ...params, stateList: params.stateIds, stateIds: undefined });

  updateSpecifyProduct: (params: {
    id: string;
    barcode: string;
    contents: number;
    quantity: number;
    recommendedRetailPrice: number;
    stateList: string[];
    totalPrice: number;
    unitPrice: number;
    unitType: UnitTypeResponse;
    discount: boolean;
    discountValue?: number;
    discountUnit?: number;
    promotionType?: PromotionType;
    promotionText?: string;
  }) => Promise<ISpecifyProductResponse> = ({ ...params }) => {
    const { id, ...others } = params;

    return ApiCall.put(`/products/specify/${params.id}`, { ...others });
  };

  addActiveStates: (s: { userId?: string; stateIds: string[] }) => Promise<IAddressStateResponse[]> = ({
    userId,
    stateIds,
  }) => {
    if (userId) {
      return ApiCall.post(`/users/activestates/${userId}`, stateIds);
    }

    return ApiCall.post('/user/activestates', stateIds);
  };

  removeItemFromCard: (s: { id: string }) => Promise<any> = ({ id }) =>
    ApiCall.delete(`/cart/${id}`).then(item => ({ ...item, removed: true }));

  removeProduct: (s: { id: string }) => Promise<IProductResponse> = ({ id }) =>
    ApiCall.delete(`/products/${id}`).then(item => ({ ...item, removed: true }));

  clearCard: () => Promise<any> = () => ApiCall.delete('/cart');

  cardCheckout: (s: { sellerIdList: string[] }) => Promise<IOrder[]> = ({ sellerIdList }) =>
    ApiCall.post('/cart/checkout/', { sellerIdList });

  cartSetPayment: (s: { paymentOption: string; holderId: string }) => Promise<ICardResponse> = ({
    paymentOption,
    holderId,
  }) => ApiCall.post('/cart/setPayment', { paymentOption, holderId });

  updateInfos: (params: {
    id?: string;
    address: {
      cityId: string;
      details: string;
      stateId: string;
    };
    email: string;
    name: string;
  }) => Promise<IUserCommonResponse> = (...params) => {
    if (params[0].id) {
      return ApiCall.put(`/users/info/${params[0].id}`, ...params);
    }

    return ApiCall.put('/user/info', ...params);
  };

  updatePassword: (params: { password: string; passwordConfirmation: string }) => Promise<any> = (...params) =>
    ApiCall.post('/user/changePassword', ...params);

  removeProductSpecify: (s: { id: string }) => Promise<ISpecifyProductResponse> = ({ id }) =>
    ApiCall.delete(`/products/specify/${id}`).then(item => ({ ...item, removed: true }));

  createUser: (params: {
    cityId: string;
    stateId: string;
    details: string;
    name: string;
    username: string;
    email: string;
    password: string;
    roleType: UserRoleResponse;
    status: boolean;
    taxNumber: string;
  }) => Promise<IUserRegisterResponse> = (...params) => ApiCall.post('/users', ...params);

  updateOrder: (params: {
    id: string;
    paidPrice?: number;
    status: TOrderStatus;
    waybillDate?: string;
  }) => Promise<IOrder> = ({ ...params }) => {
    const { id, ...others } = params;

    return ApiCall.put(`/orders/${params.id}`, { ...others });
  };

  addBarcode: (params: { id: string; barcode: string }) => Promise<IProductResponse> = ({ id, barcode }) =>
    ApiCall.post(`/products/addbarcode/${id}`, { barcode });

  removeBarcode: (params: { id: string; barcode: string }) => Promise<IProductResponse> = ({ id, barcode }) =>
    ApiCall.post(`/products/removebarcode/${id}`, { barcode });

  createAnnouncement = (params: { title: string; message: string; lastDate: string; uploadfile: File }) => {
    const formData = new FormData();
    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });

    return ApiCall.post('/announcements', formData);
  };

  removeAnnouncement: (params: { id: string }) => Promise<IAnnouncement> = ({ id }) =>
    ApiCall.delete(`/announcements/${id}`).then(item => ({ ...item, removed: true }));

  removeNotification: (params: { id: string }) => Promise<INotificationResponse> = ({ id }) =>
    ApiCall.delete(`/notifications/${id}`).then(item => ({ ...item, removed: true }));

  createNotification: (params: { userId: string; message: string; title: string }) => Promise<INotificationResponse> = (
    ...params
  ) => ApiCall.post('/notifications', ...params);

  editCredit: (params: { creditId: string; totalDebt: number; creditLimit: number }) => Promise<ICreditResponse> = ({
    ...params
  }) => {
    const { creditId, ...others } = params;

    return ApiCall.put(`/credits/${creditId}`, { ...others });
  };

  editObligation: (params: {
    obligationId: string;
    debt: number;
    receivable: number;
  }) => Promise<IObligationTotals> = ({ ...params }) => {
    const { obligationId, ...others } = params;

    return ApiCall.put(`/obligations/${obligationId}`, { ...others });
  };

  createTicket: (params: { title: string; message: string; importanceLevel: string }) => Promise<ITicketResponse> = ({
    ...params
  }) => ApiCall.post('/tickets', { ...params });

  createTicketReply: (params: { id: string; message: string }) => Promise<ITicketReplyResponse> = ({ id, message }) =>
    ApiCall.post(`/tickets/${id}/createreply`, { message });

  orderConfirm: (params: { id: string; items: IOrderConfirmItem[] }) => Promise<IOrder> = ({ id, items }) =>
    ApiCall.post(`/orders/confirm/${id}`, { items });

  updateCommission: (params: { id: string; commission: number }) => Promise<IUserCommonResponse> = ({
    id,
    commission,
  }) => ApiCall.put('/users/commissions', { id, commission });

  deneme = () => Promise.resolve({ id: '12341' });
}

const mutationEndPoints = new MutationEndpoints();

export { mutationEndPoints };
