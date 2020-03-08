import * as React from 'react';
import styled, { colors } from '~/styled';

/* MyCustomers Helpers */
interface MyCustomersProps {}

/* MyCustomers Constants */

/* MyCustomers Styles */
const StyledMyCustomersWrapper = styled.div`
  background-color: ${colors.primary};
`;

/* MyCustomers Component  */
function MyCustomers(props: React.PropsWithChildren<MyCustomersProps>) {
  /* MyCustomers Variables */
  /* MyCustomers Callbacks */

  /* MyCustomers Lifecycle  */

  return <StyledMyCustomersWrapper />;
}
const PureMyCustomers = React.memo(MyCustomers);

export { PureMyCustomers as MyCustomers };
