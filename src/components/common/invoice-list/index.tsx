import * as React from 'react';
import styled, { colors } from '~/styled';
import { useTranslation } from '~/i18n';
import { UILink, UITable } from '~/components/ui';
import { Invoice } from '~/services/helpers/backend-models';

/* InvoiceListComponent Helpers */
interface InvoiceListComponentProps {
  invoices: Invoice[];
  elementCountOfPage: number;
}

/* InvoiceListComponent Constants */
const InvoicesPageStrings = {
  buyer: 'Alici',
  seller: 'Satici',
  discount: 'Indirim',
  paidPrice: 'Odenen F.',
  totalPrice: 'Toplam F.',
  unPaidPrice: 'Odenmemis F.',
};
/* InvoiceListComponent Styles */
const StyledLink = styled(UILink)`
  color: ${colors.primaryDark};
`;

/* InvoiceListComponent Component  */
function InvoiceListComponent(props: React.PropsWithChildren<InvoiceListComponentProps>) {
  /* InvoiceListComponent Variables */
  const { t } = useTranslation();
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

  /* InvoiceListComponent Callbacks */

  /* InvoiceListComponent Lifecycle  */

  return (
    <UITable
      id="invoices-page-table"
      data={props.invoices}
      rowCount={props.elementCountOfPage > 0 ? props.elementCountOfPage : 15}
      columns={columns}
    />
  );
}
const PureInvoiceListComponent = React.memo(InvoiceListComponent);

export { PureInvoiceListComponent as InvoiceListComponent };
