import * as React from 'react';
import { IOrder, TOrderStatus } from '~/__types';
import { Mutation } from '~/components/common';
import { mutationEndPoints } from '~/services';
import { ORDER_STATUS_MAP } from '~/utils/constants';
import { Img } from '~/components/ui';

const OrderDetail: React.SFC<IOrderDetailProps> = props => {
  const { order } = props;
  return (
    <div>
      <div>alici : {order.buyerName}</div>
      <div>toplam ucret : {order.totalPrice}</div>
      <div>durum : {ORDER_STATUS_MAP[order.status]}</div>
      <h2>Items</h2>
      {order.orderItems.map((oi, index) => {
        const photoUrl = `https://picsum.photos/${(index + 1) * 100}`;
        // const photoUrl=oi.productPhotoUrl
        return (
          <div key={oi.id} className="card-item-wrapper">
            <div className="start-item">
              <Img src={photoUrl} extraClassName="product-image" alt={oi.productName} />
              <div>
                <div>name : {oi.productName}</div>
                <div>seller : {oi.sellerName}</div>
                <div>total price : {oi.totalPrice}</div>
                <div>unitType : {oi.unitType}</div>
                <div>unit price : {oi.unitPrice}</div>
              </div>
            </div>
          </div>
        );
      })}
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
    </div>
  );
};
interface IOrderDetailProps {
  order: IOrder;
}

export default OrderDetail;
