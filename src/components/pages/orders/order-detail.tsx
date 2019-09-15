import * as React from 'react';
import { IOrder, TOrderStatus } from '~/__types';
import { Mutation } from '~/components/common';
import { mutationEndPoints } from '~/services';
import { ORDER_STATUS_MAP, UNIT_TYPE_MAP } from '~/utils/constants';
import { Img } from '~/components/ui';
import { IWithAuthUserComponentProps, withAuthUser } from '~/components/hoc/with-auth-user';
import { isUserMerchant, isUserCustomer } from '~/utils';

const OrderDetail: React.SFC<IOrderDetailProps> = props => {
  const { order, user } = props;
  if (!user) {
    return null;
  }

  return (
    <div>
      {isUserCustomer(user) && <div>satici : {order.sellerName}</div>}
      {isUserMerchant(user) && <div>alici : {order.buyerName}</div>}
      <div>toplam ucret : {order.totalPrice}</div>
      <div>durum : {ORDER_STATUS_MAP[order.status]}</div>
      <h2>Items</h2>
      {order.orderItems.map((oi, index) => {
        const photoUrl = oi.productPhotoUrl;

        return (
          <div key={oi.id} className="card-item-wrapper">
            <div className="start-item">
              <Img src={photoUrl} extraClassName="product-image" alt={oi.productName} />
              <div>
                <div>name : {oi.productName}</div>
                <div>seller : {oi.sellerName}</div>
                <div>total price : {oi.totalPrice}</div>
                <div>tipi : {UNIT_TYPE_MAP[oi.unitType]}</div>
                <div>unit price : {oi.unitPrice}</div>
              </div>
            </div>
          </div>
        );
      })}
      {isUserMerchant(user) && (
        <Mutation mutation={mutationEndPoints.updateOrders}>
          {(updateOrders, { data: updateOrdersResponse, loading: updateOrdersLoading, error: updateOrdersError }) => {
            if (updateOrdersError) {
              return <div>Error updateOrders</div>;
            }

            return (
              <div className="end-items">
                <button
                  type="button"
                  disabled={updateOrdersLoading || updateOrdersError}
                  onClick={() => {
                    updateOrders({ id: order.id, status: 'CANCELLED' });
                  }}
                >
                  {updateOrdersLoading ? 'Loading...' : 'Siparisi Iptal Et'}
                </button>

                <button
                  type="button"
                  disabled={updateOrdersLoading || updateOrdersError}
                  onClick={() => {
                    updateOrders({ id: order.id, status: 'FINISHED' });
                  }}
                >
                  {updateOrdersLoading ? 'Loading...' : 'Siparisi Onayla'}
                </button>
              </div>
            );
          }}
        </Mutation>
      )}
    </div>
  );
};
interface IOrderDetailProps extends IWithAuthUserComponentProps {
  order: IOrder;
}

export default withAuthUser(OrderDetail);
