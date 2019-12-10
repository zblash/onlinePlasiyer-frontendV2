import * as React from 'react';
import styled from '~/styled';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { InvoiceListComponent } from '~/components/common/invoice-list';
import { Container } from '~/components/ui';

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
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;

const InvoicesPage: React.SFC<InvoicesPageProps> = props => {
  const {
    data: { values: invoices, elementCountOfPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllInvoices, {
    defaultValue: { values: [] },
    pageNumber: 1,
  });

  // TODO: fetch next page on change page
  const __ = (
    <Container>
      <StyledPageContainer>
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
