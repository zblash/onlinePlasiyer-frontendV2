import * as React from 'react';
import { useParams } from 'react-router';
import styled from '~/styled';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { Container } from '~/components/ui';
import { InvoiceListComponent } from '~/components/common/invoice-list';

/* UserInvoicesPage Helpers */
interface UserInvoicesPageProps {}
interface RouteParams {
  userId: string;
}
/* UserInvoicesPage Constants */

/* UserInvoicesPage Styles */
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;

/* UserInvoicesPage Component  */
function UserInvoicesPage(props: React.PropsWithChildren<UserInvoicesPageProps>) {
  /* UserInvoicesPage Variables */
  const { userId } = useParams<RouteParams>();
  const {
    data: { values: invoices, elementCountOfPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllInvoices, {
    defaultValue: { values: [] },
    variables: { userId },
    pageNumber: 1,
  });
  /* UserInvoicesPage Callbacks */

  /* UserInvoicesPage Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        <InvoiceListComponent invoices={invoices} elementCountOfPage={elementCountOfPage} />
      </StyledPageContainer>
    </Container>
  );
}
const PureUserInvoicesPage = React.memo(UserInvoicesPage);

export { PureUserInvoicesPage as UserInvoicesPage };
