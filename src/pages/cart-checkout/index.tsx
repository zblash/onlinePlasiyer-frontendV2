import * as React from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import styled, { colors, css } from '~/styled';
import { IOrder } from '~/services/helpers/backend-models';
import { Container, UILink } from '~/components/ui';

/* CartCheckoutPage Helpers */
interface CartCheckoutPageProps {}

/* CartCheckoutPage Constants */

/* CartCheckoutPage Styles */
const StyledCartCheckoutHeader = styled.div`
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
  display: flex;
  justify-content: center;
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
const StyledLink = styled(UILink)`
  color: ${colors.primaryDark};
`;
const orderItemImg = css`
  width: 100%;
  height: 150px;
`;
const orderItemTitle = css`
  margin-top: 0;
`;
/* CartCheckoutPage Component  */
function CartCheckoutPage(props: React.PropsWithChildren<CartCheckoutPageProps>) {
  /* CartCheckoutPage Variables */
  const { t } = useTranslation();
  const location = useLocation<IOrder[]>();
  /* CartCheckoutPage Callbacks */
  /* CartCheckoutPage Lifecycle  */

  return (
    <Container>
      <StyledCartCheckoutHeader>
        <h2>{t('cart.orders-completed')}</h2>
      </StyledCartCheckoutHeader>
      {location.state.map(order => (
        <StyledOrderWrapper key={order.id}>
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
                  <span>{t('common.total-price')} : </span>
                  <strong>{order.totalPrice} TL</strong>
                </p>
              </StyledOrderHeaderRightBoxPrice>
              <StyledOrderHeaderRightBoxDetail>
                <p>
                  <StyledLink to="/orders">{t('cart.show-order-detail')}</StyledLink>
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
                  <h3 className={orderItemTitle}>{orderItem.productName}</h3>
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
                    <strong>{orderItem.productBarcode}</strong>
                  </p>
                </StyledOrderItemDescLeftBox>
              </StyledOrderItemDescWrapper>
            </StyledOrderItemWrapper>
          ))}
        </StyledOrderWrapper>
      ))}
    </Container>
  );
}
const PureCartCheckoutPage = React.memo(CartCheckoutPage);

export { PureCartCheckoutPage as CartCheckoutPage };
