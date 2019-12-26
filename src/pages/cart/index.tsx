import * as React from 'react';
import { useHistory } from 'react-router';
import styled, { colors, css } from '~/styled';
import { Container, UIButton } from '~/components/ui';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { CartItem } from '~/components/common/cart/cart-item';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { refetchFactory } from '~/services/utils';
import { useApplicationContext } from '~/app/context';
import { IOrder } from '~/services/helpers/backend-models';
import { useTranslation } from '~/i18n';
import { UseTranslationAllKeys } from '~/helpers/static-types';

/* CartPage Helpers */
interface CartPageProps {}

/* CartPage Constants */

/* CartPage Styles */
const StyledCartPageWrapper = styled.div`
  width: 100%;
  margin-bottom: 25px;
  height: auto;
  overflow: hidden;
`;

const StyledCartContent = styled.div`
  width: 70%;
  float: left;
  border: 1px solid ${colors.lightGray};
  border-radius: 6px;
  background-color: ${colors.white};
`;

const StyledCartRightBox = styled.div`
  width: 25%;
  float: right;
`;

const StyledCartCheckoutBox = styled.div`
  width: 99%;
  border: 1px solid ${colors.lightGray};
  border-radius: 6px;
  background-color: ${colors.white};
  text-align: center;
  padding: 20px 0;
  margin-bottom: 10px;
`;

const StyledCartContentHeader = styled.div`
  border-bottom: 1px solid ${colors.lightGray};
  padding-left: 30px;
`;

const StyledCartContentBox = styled.div`
  float: left;
  display: block;
  width: 100%;
`;

const StyledCartContentBoxTitle = styled.div`
    border-bottom 1px solid ${colors.lightGray};
    float: left;
    display: block;
    width: 100%;
`;

const StyledCartContentBoxTitleDetail = styled.div`
  width: 50%;
  border-right: 1px solid ${colors.lightGray};
  height: 55px;
  float: left;
`;

const StyledCartContentBoxTitleQuantity = styled.div`
  width: 20%;
  float: left;
  height: 55px;
  border-right: 1px solid ${colors.lightGray};
  align-items: center;
`;

const StyledCartContentBoxTitlePrice = styled.div`
  width: 29%;
  float: left;
  height: 55px;
  align-items: center;
`;
const StyledCartCheckoutBtn = styled(UIButton)`
  text-align: center;
  display: block !important;
  height: 40px;
  transition: background-color 0.3s;
  background-color: ${colors.primaryDark};
  color: ${colors.white};
  border-radius: 8px;
  margin: auto;
  width: 75%;
  :active {
    background-color: ${colors.primaryDark};
    color: ${colors.white};
  }
  :hover {
    background-color: ${colors.primaryDark};
    color: ${colors.white};
  }
  :disabled {
    background-color: ${colors.lightGray};
    color: ${colors.primaryDark};
  }
`;
const CartItemWrapper = styled.div`
  width: 100%;
`;
const CartItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 3% 0 3%;
  border-bottom: 1px solid ${colors.lightGray};
`;
const PaymentLabel = styled.label`
  display: inline-block;
  background-color: ${colors.lightGray};
  border: 2px solid ${colors.gray};
  border-radius: 4px;
  width: 75%;
  padding: 7px 0 7px 0;
  margin: 2px auto 2px auto;
`;
const PaymentInput = styled.input`
  opacity: 0;
  position: fixed;
  width: 0;
  &:checked + ${PaymentLabel} {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
`;
const titleText = css`
  float: left;
  padding-left: 30px;
`;
const clearCartText = css`
  float: left;
  padding-left: 30px;
  cursor: pointer;
`;
const titleP = css`
  text-align: center;
`;

/* CartPage Component  */
function CartPage(props: React.PropsWithChildren<CartPageProps>) {
  const applicationContext = useApplicationContext();
  const { t } = useTranslation();
  const routerHistory = useHistory();
  const [paymentMethod, setPaymentMethod] = React.useState();
  const { data: cart } = useQuery(queryEndpoints.getCard, {
    defaultValue: {},
  });
  const { mutation: clearCart } = useMutation(mutationEndPoints.clearCard, {
    refetchQueries: [refetchFactory(queryEndpoints.getCard, null, true)],
  });

  const { mutation: checkoutCart } = useMutation(mutationEndPoints.cardCheckout, {
    refetchQueries: [refetchFactory(queryEndpoints.getCard, null)],
  });

  const { data: paymentMethods, loading: methodsLoading } = useQuery(queryEndpoints.getPaymentMethods, {
    defaultValue: {},
  });

  const { mutation: setPayment } = useMutation(mutationEndPoints.cartSetPayment, {
    variables: {
      paymentOption: paymentMethod,
    },
  });

  const handleClearCart = React.useCallback(() => {
    applicationContext.loading.show();
    clearCart().finally(() => {
      applicationContext.loading.hide();
    });
  }, [applicationContext.loading, clearCart]);

  const handleCartCheckout = React.useCallback(() => {
    checkoutCart().then((orders: IOrder[]) => {
      routerHistory.push(`/cart/checkout`, orders);
    });
  }, [routerHistory, checkoutCart]);

  const handlePaymentMethod = React.useCallback(e => {
    setPaymentMethod(e.target.value);
  }, []);

  const __ = (
    <Container>
      <CategoryHorizontalListFetcher shouldUseProductsPageLink />
      <StyledCartPageWrapper>
        <StyledCartContent>
          <StyledCartContentHeader>
            <h3>Alisveris Sepetim</h3>
          </StyledCartContentHeader>
          <StyledCartContentBox>
            <StyledCartContentBoxTitle>
              <StyledCartContentBoxTitleDetail>
                <p className={titleText}>Sepette {cart.quantity} urun var</p>
                <p className={clearCartText} onClick={handleClearCart}>
                  Sepeti Temizle
                </p>
              </StyledCartContentBoxTitleDetail>
              <StyledCartContentBoxTitleQuantity>
                <p className={titleP}>Adet</p>
              </StyledCartContentBoxTitleQuantity>
              <StyledCartContentBoxTitlePrice>
                <p className={titleP}>Fiyat</p>
              </StyledCartContentBoxTitlePrice>
            </StyledCartContentBoxTitle>
            {cart.items &&
              cart.items.map(cartItem => (
                <CartItemWrapper key={cartItem.id}>
                  <CartItemHeader>
                    <p>
                      <span>Satici : </span>
                      <strong>{cartItem.seller}</strong>
                    </p>
                    <p>
                      Toplam : {cartItem.totalPrice} TL ({cartItem.quantity} Adet)
                    </p>
                  </CartItemHeader>
                  {cartItem.details.map(detail => (
                    <CartItem key={detail.id} cartItem={detail} />
                  ))}
                </CartItemWrapper>
              ))}
          </StyledCartContentBox>
        </StyledCartContent>
        <StyledCartRightBox>
          <StyledCartCheckoutBox>
            <h3>Odeme Yontemini Sec</h3>
            {!methodsLoading &&
              paymentMethods.paymentOptions.map(paymentOpt => (
                <div key={paymentOpt}>
                  <PaymentInput
                    type="radio"
                    value={paymentOpt}
                    id={paymentOpt}
                    checked={paymentMethod === paymentOpt}
                    onChange={handlePaymentMethod}
                  />
                  <PaymentLabel htmlFor={paymentOpt}>{t(`cart.${paymentOpt}` as UseTranslationAllKeys)}</PaymentLabel>
                </div>
              ))}
          </StyledCartCheckoutBox>
          <StyledCartCheckoutBox>
            <h3>Genel Toplam ({cart.quantity})</h3>
            <h2>{cart.totalPrice} TL</h2>
            <StyledCartCheckoutBtn disabled={!paymentMethod} onClick={handleCartCheckout}>
              Siparisi Tamamla
            </StyledCartCheckoutBtn>
          </StyledCartCheckoutBox>
        </StyledCartRightBox>
      </StyledCartPageWrapper>
    </Container>
  );

  /* CartPage Lifecycle  */
  React.useEffect(() => {
    if (paymentMethod) {
      setPayment();
    }
  }, [paymentMethod]); // eslint-disable-line

  /* CartPage Functions  */

  return __;
}

export { CartPage };
