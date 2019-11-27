import * as React from 'react';
import styled, { colors } from '~/styled';

/* OrderPage Helpers */
interface OrderPageProps {
  orderId: string;
}

/* OrderPage Constants */

/* OrderPage Styles */
const StyledOrderPageWrapper = styled.div`
  background-color: ${colors.primary};
`;

/* OrderPage Component  */
function OrderPage(props: React.PropsWithChildren<OrderPageProps>) {
  /* OrderPage Variables */
  /* OrderPage Callbacks */

  /* OrderPage Lifecycle  */

  return <StyledOrderPageWrapper>Deneme</StyledOrderPageWrapper>;
}
const PureOrderPage = React.memo(OrderPage);

export { PureOrderPage as OrderPage };
