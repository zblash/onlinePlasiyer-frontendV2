import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { queryEndpoints } from '~/services';
import { Query } from '~/components/common';

const CustomerBasketIcon: React.SFC<ICustomerBasketProps> = props => {
  return (
    <div>
      <Query query={queryEndpoints.getCard}>
        {({ data: customerCard, loading: customerCardLoading, error: customerCardError }) => {
          if (customerCardLoading) {
            return <div>Loading customerCard</div>;
          }
          if (customerCardError) {
            return <div>Error customerCard</div>;
          }

          return <NavLink to="/customer/basket/">Sepet {customerCard.quantity}</NavLink>;
        }}
      </Query>
    </div>
  );
};
interface ICustomerBasketProps {}

export default CustomerBasketIcon;
