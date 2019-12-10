import * as React from 'react';
import { useParams } from 'react-router';
import styled from '~/styled';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { Container } from '~/components/ui';
import { OrderListComponent } from '~/components/common/order-list';

/* UserOrdersPage Helpers */
interface UserOrdersPageProps {}
interface RouteParams {
  userId: string;
}
/* UserOrdersPage Constants */

/* UserOrdersPage Styles */
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;

/* UserOrdersPage Component  */
function UserOrdersPage(props: React.PropsWithChildren<UserOrdersPageProps>) {
  /* UserOrdersPage Variables */
  const { userId } = useParams<RouteParams>();
  const {
    data: { values: orders, elementCountOfPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllOrders, {
    defaultValue: { values: [] },
    variables: {
      userId,
    },
    pageNumber: 1,
  });
  /* UserOrdersPage Callbacks */

  /* UserOrdersPage Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        <OrderListComponent orders={orders} elementCountOfPage={elementCountOfPage} />
      </StyledPageContainer>
    </Container>
  );
}
const PureUserOrdersPage = React.memo(UserOrdersPage);

export { PureUserOrdersPage as UserOrdersPage };
