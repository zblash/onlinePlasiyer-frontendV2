import './style-merchant-orders.scss';
import * as React from 'react';
import { queryEndpoints } from '~/services';
import { Query } from '~/components/common';
import Order from './order';
import OrderDetail from './order-detail';
import { RouteComponentProps } from 'react-router';

const MerchantOrders: React.SFC<IMerchantOrdersProps> = props => {
  const {
    match: {
      params: { id },
    },
  } = props;

  return (
    <div>
      <Query query={queryEndpoints.getAllOrders}>
        {({ data: orders, loading: ordersLoading, error: ordersError }) => {
          if (ordersLoading) {
            return <div>Loading orders</div>;
          }
          if (ordersError) {
            return <div>Error orders</div>;
          }
          const order = orders.find(o => o.id === id);
          if (id && order) {
            return <OrderDetail order={order} />;
          }
          return (
            <div>
              {orders.map(order => (
                <Order order={order} />
              ))}
            </div>
          );
        }}
      </Query>
    </div>
  );
};
interface IMerchantOrdersProps extends RouteComponentProps<{ id: string }> {}

export default MerchantOrders;
