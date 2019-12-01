import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { colors } from '~/styled';
import { Container, UITable, UILink } from '~/components/ui';
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
const StyledLink = styled(UILink)`
  color: ${colors.primaryDark};
`;

const InvoicesPage: React.SFC<InvoicesPageProps> = props => {
  const { t } = useTranslation();

  const {
    data: { values: invoices, elementCountOfPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllInvoices, { defaultValue: { values: [] }, pageNumber: 1 });
  const columns = [
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
    {
      title: null,
      itemRenderer: item => <StyledLink to={`/invoice/${item.id}`}>{t('cart.show-order-detail')}</StyledLink>,
    },
  ];

  // TODO: fetch next page on change page
  const __ = (
    <Container>
      <StyledPageContainer>
        <UITable
          id="invoices-page-table"
          data={invoices}
          rowCount={elementCountOfPage > 0 ? elementCountOfPage : 15}
          columns={columns}
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
