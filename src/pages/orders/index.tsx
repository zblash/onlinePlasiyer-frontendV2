import * as React from 'react';
import { useParams } from 'react-router';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
import { OrderListComponent } from '~/components/common/order-list';
import { Container } from '~/components/ui';
import styled from '~/styled';
import { useApplicationContext } from '~/app/context';

/*
  OrdersPage Helpers
*/
interface OrdersPageProps {}
interface RouteParams {
  userId: string;
}
/*
  OrdersPage Colors // TODO : move theme.json
*/
/*
  OrdersPage Strings
*/

/*
  OrdersPage Styles
*/
const StyledPageContainer = styled.div``;
const StyledPageHeader = styled.div`
  display: flex;
`;
const OrdersPage: React.SFC<OrdersPageProps> = props => {
  const applicationContext = useApplicationContext();
  const { userId } = useParams<RouteParams>();
  const [customer, setCustomer] = React.useState();
  const [sortBy, setSortBy] = React.useState();
  const [sortType, setSortType] = React.useState();
  const {
    data: { values: orders, elementCountOfPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllOrders, {
    defaultValue: { values: [] },
    variables: {
      sortBy,
      sortType,
      userId,
      userName: customer,
    },
    pageNumber: 1,
  });

  const handleChangeCustomer = React.useCallback((e: string) => {
    setCustomer(e);
  }, []);
  const __ = (
    <Container>
      {applicationContext.user.isCustomer && <CategoryHorizontalListFetcher shouldUseProductsPageLink />}
      <StyledPageContainer>
        <StyledPageHeader>
          <h3>{applicationContext.user.isAdmin ? 'Siparisler' : 'Siparislerim'}</h3>
        </StyledPageHeader>
        <OrderListComponent
          setSortBy={setSortBy}
          setSortType={setSortType}
          orders={orders}
          elementCountOfPage={elementCountOfPage}
          setCustomer={handleChangeCustomer}
        />
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
