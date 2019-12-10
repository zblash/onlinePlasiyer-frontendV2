import * as React from 'react';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
import { OrderListComponent } from '~/components/common/order-list';
import { Container } from '~/components/ui';
import styled from '~/styled';

/*
  OrdersPage Helpers
*/
interface OrdersPageProps {}

/*
  OrdersPage Colors // TODO : move theme.json
*/
/*
  OrdersPage Strings
*/

/*
  OrdersPage Styles
*/
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;

const OrdersPage: React.SFC<OrdersPageProps> = props => {
  const {
    data: { values: orders, elementCountOfPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllOrders, {
    defaultValue: { values: [] },
    pageNumber: 1,
  });
  const __ = (
    <Container>
      <CategoryHorizontalListFetcher shouldUseProductsPageLink />
      <StyledPageContainer>
        <OrderListComponent orders={orders} elementCountOfPage={elementCountOfPage} />
      </StyledPageContainer>
    </Container>
  );

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
