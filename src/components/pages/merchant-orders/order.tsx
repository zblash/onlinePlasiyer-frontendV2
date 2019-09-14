import * as React from 'react';
import { IOrder } from '~/__types';
import { ORDER_STATUS_MAP } from '~/utils/constants';
import { NavLink } from 'react-router-dom';

const MerchantOrder: React.SFC<IMerchantOrderProps> = props => {
  const { order } = props;
  return (
    <div className="order-wrapper">
      <div className="start-items">
        <div>alici : {order.buyerName}</div>
        <div>toplam ucret : {order.totalPrice}</div>
        <div>durum : {ORDER_STATUS_MAP[order.status]}</div>
        <NavLink to={`/merchant/orders/${order.id}`}>Incele</NavLink>
      </div>
    </div>
  );
};
interface IMerchantOrderProps {
  order: IOrder;
}

export default MerchantOrder;
