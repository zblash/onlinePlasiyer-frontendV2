import * as React from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import styled, { colors, css } from '~/styled';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { Container, UITable } from '~/components/ui';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';

/* InvoicePage Helpers */
interface InvoicePageProps {}
interface RouteParams {
  invoiceId: string;
}
/* InvoicePage Constants */

/* InvoicePage Styles */

const StyledOrderWrapper = styled.div`
  width: 100%;
  margin-bottom: 25px;
`;
const StyledInvoiceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid ${colors.lightGray}
  border-radius: 8px;
  background-color: ${colors.white}
  padding: 0 10px 0 10px;
  font-size: 14px;
  margin-bottom: 15px;
`;
const StyledOrderHeaderLeftBox = styled.div`
  width: 40%;
`;
const StyledOrderHeaderRightBox = styled.div`
  width: 60%;
`;
const StyledOrderHeaderRightBoxPrice = styled.div`
  width: 50%;
  float: left;
`;
const StyledOrderHeaderRightBoxDetail = styled.div`
  width: 50%;
  float: left;
`;
const alignTextRight = css`
  text-align: right;
`;
/* InvoicePage Component  */
function InvoicePage(props: React.PropsWithChildren<InvoicePageProps>) {
  /* InvoicePage Variables */
  const { t } = useTranslation();
  const { invoiceId } = useParams<RouteParams>();
  const { data: invoice } = useQuery(queryEndpoints.getInvoice, {
    defaultValue: {
      totalPrice: 0,
      buyer: '',
      discount: 0,
      seller: '',
      paidPrice: 0,
      unPaidPrice: 0,
      order: {
        id: '',
        status: 'NEW',
        orderItems: [],
        buyerName: '',
        orderDate: '',
        sellerName: '',
        totalPrice: 0,
        waybillDate: '',
        buyerAddress: {
          cityId: '',
          cityName: '',
          details: '',
          id: '',
          stateId: '',
          stateName: '',
        },
      },
    },
    variables: { id: invoiceId },
  });
  /* InvoicePage Callbacks */

  /* InvoicePage Lifecycle  */

  return (
    <Container>
      <CategoryHorizontalListFetcher shouldUseProductsPageLink />
      <StyledOrderWrapper>
        <StyledInvoiceHeader>
          <StyledOrderHeaderLeftBox>
            <p>
              <span>{t('common.merchant')} : </span>
              <strong>{invoice.seller}</strong>
            </p>
            <p>
              <span>{t('invoice.code')} : </span>
              <strong>{invoice.id}</strong>
            </p>
          </StyledOrderHeaderLeftBox>
          <StyledOrderHeaderRightBox>
            <StyledOrderHeaderRightBoxPrice>
              <p>
                <span>{t('common.customer')} : </span>
                <strong>{invoice.buyer}</strong>
              </p>
              <p>
                <span>{t('common.total-price')} : </span>
                <strong>{invoice.totalPrice} TL</strong>
              </p>
            </StyledOrderHeaderRightBoxPrice>
            <StyledOrderHeaderRightBoxDetail>
              <p className={alignTextRight}>
                <span>{t('invoice.paid-price')} : </span>
                <strong>{invoice.paidPrice} TL</strong>
              </p>
              <p className={alignTextRight}>
                <span>{t('invoice.un-paid-price')} : </span>
                <strong>{invoice.unPaidPrice} TL</strong>
              </p>
            </StyledOrderHeaderRightBoxDetail>
          </StyledOrderHeaderRightBox>
        </StyledInvoiceHeader>
        <UITable
          id="invoice-page-table"
          data={invoice.order.orderItems}
          rowCount={invoice.order.orderItems.length > 0 ? invoice.order.orderItems.length : 25}
          hidePagination
          columns={[
            {
              title: t('common.barcode'),
              itemRenderer: item => item.productBarcodeList.join(','),
            },
            {
              title: t('common.product-name'),
              itemRenderer: item => item.productName,
            },
            {
              title: t('order.quantity'),
              itemRenderer: item => item.quantity,
            },
            {
              title: t('common.unit-type'),
              itemRenderer: item => item.unitType,
            },
            {
              title: t('common.unit-price'),
              itemRenderer: item => item.unitPrice,
            },
            {
              title: t('common.total-price'),
              itemRenderer: item => item.totalPrice,
            },
            {
              title: t('cart.recommended-sales-price'),
              itemRenderer: item => item.recommendedRetailPrice,
            },
          ]}
        />
      </StyledOrderWrapper>
    </Container>
  );
}
const PureInvoicePage = React.memo(InvoicePage);

export { PureInvoicePage as InvoicePage };
