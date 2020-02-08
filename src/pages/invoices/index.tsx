import * as React from 'react';
import styled from '~/styled';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { InvoiceListComponent } from '~/components/common/invoice-list';
import { Container } from '~/components/ui';
import { useApplicationContext } from '~/app/context';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';

/*
  InvoicesPage Helpers
*/
interface InvoicesPageProps {}

/*
  InvoicesPage Strings
*/

/*
  InvoicesPage Styles
*/
const StyledPageContainer = styled.div``;
const StyledPageHeader = styled.div`
  display: flex;
`;
const InvoicesPage: React.SFC<InvoicesPageProps> = props => {
  const applicationContext = useApplicationContext();
  const {
    data: { values: invoices, elementCountOfPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllInvoices, {
    defaultValue: { values: [] },
    pageNumber: 1,
  });

  // TODO: fetch next page on change page
  const __ = (
    <Container>
      {applicationContext.user.isCustomer && <CategoryHorizontalListFetcher shouldUseProductsPageLink />}
      <StyledPageContainer>
        <StyledPageHeader>
          <h3>{applicationContext.user.isAdmin ? 'Tum Faturalar' : 'Faturalarim'}</h3>
        </StyledPageHeader>
        <InvoiceListComponent invoices={invoices} elementCountOfPage={elementCountOfPage} />
      </StyledPageContainer>
    </Container>
  );

  /*
  InvoicesPage Lifecycle
  */

  /*
  InvoicesPage Functions
  */

  return __;
};

const _InvoicesPage = InvoicesPage;

export { _InvoicesPage as InvoicesPage };
