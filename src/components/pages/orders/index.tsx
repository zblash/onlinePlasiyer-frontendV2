import * as React from 'react';
import styled from '~/styled';

/*
  OrdersPage Helpers
*/
interface OrdersPageProps {}

/*
  OrdersPage Colors
*/
const OrdersPageColors = {
  wrapperBackground: '#fff',
};

/*
  OrdersPage Strings
*/
const OrdersPageStrings = {};

/*
  OrdersPage Styles
*/

const StyledOrdersPageWrapper = styled.div`
  background-color: ${OrdersPageColors.wrapperBackground};
`;

const OrdersPage: React.SFC<OrdersPageProps> = props => {
  const __ = <StyledOrdersPageWrapper>Hello OrdersPage</StyledOrdersPageWrapper>;

  /*
  OrdersPage Lifecycle
  */

  /*
  OrdersPage Functions
  */

  return __;
};

const _OrdersPage = OrdersPage;

export { _OrdersPage as OrdersPage };
