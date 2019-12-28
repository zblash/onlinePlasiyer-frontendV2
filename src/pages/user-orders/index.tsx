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
const StyledPageContainer = styled.div``;
const StyledPageHeader = styled.div`
  display: flex;
`;
/* UserOrdersPage Component  */
function UserOrdersPage(props: React.PropsWithChildren<UserOrdersPageProps>) {
  /* UserOrdersPage Variables */
  const { userId } = useParams<RouteParams>();
  const [sortBy, setSortBy] = React.useState();
  const [sortType, setSortType] = React.useState();
  const {
    data: { values: orders, elementCountOfPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllOrders, {
    defaultValue: { values: [] },
    variables: {
      userId,
      sortBy,
      sortType,
    },
    pageNumber: 1,
  });
  /* UserOrdersPage Callbacks */

  /* UserOrdersPage Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        <StyledPageHeader>
          <h3>Kullanici Siparisleri</h3>
        </StyledPageHeader>
        <OrderListComponent
          setSortBy={setSortBy}
          setSortType={setSortType}
          orders={orders}
          elementCountOfPage={elementCountOfPage}
        />
      </StyledPageContainer>
    </Container>
  );
}
const PureUserOrdersPage = React.memo(UserOrdersPage);

export { PureUserOrdersPage as UserOrdersPage };
