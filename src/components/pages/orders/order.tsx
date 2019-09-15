import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { IOrder } from '~/__types';
import { ORDER_STATUS_MAP } from '~/utils/constants';
import { withAuthUser, IWithAuthUserComponentProps } from '~/components/hoc/with-auth-user';
import { isUserCustomer, isUserMerchant } from '~/utils';

const OrderItem: React.SFC<IMerchantOrderProps> = props => {
  const { order, user } = props;
  if (!user) {
    return null;
  }

  return (
    <div className="order-wrapper">
      <div className="start-items">
        {isUserCustomer(user) && <div>satici : {order.sellerName}</div>}
        {isUserMerchant(user) && <div>alici : {order.buyerName}</div>}
        <div>toplam ucret : {order.totalPrice}</div>
        <div>durum : {ORDER_STATUS_MAP[order.status]}</div>
        <NavLink to={`/orders/${order.id}`}>Incele</NavLink>
      </div>
    </div>
  );
};
interface IMerchantOrderProps extends IWithAuthUserComponentProps {
  order: IOrder;
}

export default withAuthUser(OrderItem);
