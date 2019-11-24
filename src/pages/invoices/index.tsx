import * as React from 'react';
import styled from '~/styled';
import { Container, UITable } from '~/components/ui';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';

/*
  InvoicesPage Helpers
*/
interface InvoicesPageProps {}

/*
  InvoicesPage Strings
*/
const InvoicesPageStrings = {
  buyer: 'Alici',
  seller: 'Satici',
  discount: 'Indirim',
  paidPrice: 'Odenen F.',
  totalPrice: 'Toplam F.',
  unPaidPrice: 'Odenmemis F.',
};

/*
  InvoicesPage Styles
*/
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;

const InvoicesPage: React.SFC<InvoicesPageProps> = props => {
  const {
    data: { values: invoices },
  } = usePaginationQuery(paginationQueryEndpoints.getAllInvoices, { defaultValue: { values: [] } });
  // TODO: fetch next page on change page
  const __ = (
    <Container>
      <StyledPageContainer>
        <UITable
          id="invoices-page-table"
          data={invoices}
          rowCount={14}
          columns={[
            {
              title: InvoicesPageStrings.seller,
              itemRenderer: item => item.seller,
            },
            {
              title: InvoicesPageStrings.buyer,
              itemRenderer: item => item.buyer,
            },
            {
              title: InvoicesPageStrings.discount,
              itemRenderer: item => item.discount,
            },
            {
              title: InvoicesPageStrings.paidPrice,
              itemRenderer: item => item.paidPrice,
            },
            {
              title: InvoicesPageStrings.unPaidPrice,
              itemRenderer: item => item.unPaidPrice,
            },
            {
              title: InvoicesPageStrings.totalPrice,
              itemRenderer: item => item.totalPrice,
            },
          ]}
        />
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
