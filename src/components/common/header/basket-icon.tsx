import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { queryEndpoints } from '~/services';
import { Query } from '~/components/common';
import { Button } from 'react-bootstrap';

const CustomerBasketIcon: React.SFC<ICustomerBasketProps> = props => {
  const { history } = props;
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

          return (
            <Button
              onClick={() => {
                history.push('/customer/basket/');
              }}
              className="mr-5"
            >
              Sepet {customerCard.quantity}
            </Button>
          );
        }}
      </Query>
    </div>
  );
};
interface ICustomerBasketProps extends RouteComponentProps {}

// TODO : update this error
// @ts-ignore
export default withRouter(CustomerBasketIcon as React.ComponentClass<ICustomerBasketProps>);
