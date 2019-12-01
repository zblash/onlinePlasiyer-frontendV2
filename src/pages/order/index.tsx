import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import styled, { colors, css } from '~/styled';
import { Container } from '~/components/ui';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useQuery } from '~/services/query-context/context';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
/* OrderPage Helpers */
interface OrderPageProps {}

interface RouteParams {
  orderId: string;
}
/* OrderPage Constants */

/* OrderPage Styles */
const StyledOrderPageHeader = styled.div`
  width: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white}
  border: 1px solid ${colors.lightGray}
  border-radius: 8px;
  margin-bottom: 25px;
  margin-top: 25px;
 `;

const StyledOrderWrapper = styled.div`
  width: 100%;
  background-color: ${colors.white} 
  border: 1px solid ${colors.lightGray}
  border-radius: 8px;
  margin-bottom: 25px;
`;
const StyledOrderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid ${colors.lightGray}
  padding: 0 10px 0 10px;
  font-size: 14px;
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
  display: flex;
  justify-content: flex-end;
`;
const StyledOrderItemWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding 10px;
  border-bottom: 1px solid ${colors.lightGray}
`;
const StyledOrderItemImgWrapper = styled.div`
  width: 20%;
  float: left;
  margin-right: 3%;
`;
const StyledOrderItemDescWrapper = styled.div`
  width: 77%;
  float: left;
`;
const StyledOrderItemDescLeftBox = styled.div`
  width: 50%;
  float left;
  font-size 16px;
`;
const orderItemImg = css`
  width: 100%;
  height: 150px;
`;
const orderItemTitle = css`
  margin-top: 0;
`;
/* OrderPage Component  */
function OrderPage(props: React.PropsWithChildren<OrderPageProps>) {
  /* OrderPage Variables */
  const { t } = useTranslation();
  const { orderId } = useParams<RouteParams>();
  const { data: order } = useQuery(queryEndpoints.getOrder, {
    defaultValue: {
      status: 'NEW',
      orderItems: [],
    },
    variables: { id: orderId },
  });
  /* OrderPage Callbacks */

  /* OrderPage Lifecycle  */

  return (
    <Container>
      <CategoryHorizontalListFetcher shouldUseProductsPageLink />
      <StyledOrderPageHeader>
        <h3>{order.orderDate} Tarihli Siparis</h3>
      </StyledOrderPageHeader>
      <StyledOrderWrapper>
        <StyledOrderHeader>
          <StyledOrderHeaderLeftBox>
            <p>
              <span>{t('common.merchant')} : </span>
              <strong>{order.sellerName}</strong>
            </p>
            <p>
              <span>{t('order.code')} : </span>
              <strong>{order.id}</strong>
            </p>
          </StyledOrderHeaderLeftBox>
          <StyledOrderHeaderRightBox>
            <StyledOrderHeaderRightBoxPrice>
              <p>
                <span>{t('common.customer')} : </span>
                <strong>{order.buyerName}</strong>
              </p>
              <p>
                <span>{t('common.total-price')} : </span>
                <strong>{order.totalPrice} TL</strong>
              </p>
            </StyledOrderHeaderRightBoxPrice>
            <StyledOrderHeaderRightBoxDetail>
              <p>
                <span>{t('order.status-text')} : </span>
                <strong>{t(`order.status.${order.status.toString().toLowerCase()}`)}</strong>
              </p>
            </StyledOrderHeaderRightBoxDetail>
          </StyledOrderHeaderRightBox>
        </StyledOrderHeader>
        {order.orderItems.map(orderItem => (
          <StyledOrderItemWrapper key={orderItem.id}>
            <StyledOrderItemImgWrapper>
              <img alt={orderItem.productName} className={orderItemImg} src={orderItem.productPhotoUrl} />
            </StyledOrderItemImgWrapper>
            <StyledOrderItemDescWrapper>
              <StyledOrderItemDescLeftBox>
                <h3 className={orderItemTitle}>{orderItem.productName}</h3>
                <p>
                  <span>{t('common.price')} :</span>
                  <strong>{orderItem.productPrice} TL</strong>
                </p>
                <p>
                  <span>
                    {orderItem.unitType} {t('common.price')} :{' '}
                  </span>
                  <strong>{orderItem.unitPrice} TL</strong>
                </p>
                <p>
                  <span>{t('cart.recommended-sales-price')} : </span>
                  <strong>{orderItem.recommendedRetailPrice} TL</strong>
                </p>
              </StyledOrderItemDescLeftBox>
              <StyledOrderItemDescLeftBox>
                <p>
                  <span>{t('common.total-price')} :</span>
                  <strong>{orderItem.totalPrice} TL</strong>
                </p>
                <p>
                  <span>{t('order.quantity')} : </span>
                  <strong>{orderItem.quantity}</strong>
                </p>
                <p>
                  <span>{t('common.barcode')} : </span>
                  <strong>{orderItem.productBarcodeList.join(',')}</strong>
                </p>
              </StyledOrderItemDescLeftBox>
            </StyledOrderItemDescWrapper>
          </StyledOrderItemWrapper>
        ))}
      </StyledOrderWrapper>
    </Container>
  );
}
const PureOrderPage = React.memo(OrderPage);

export { PureOrderPage as OrderPage };
