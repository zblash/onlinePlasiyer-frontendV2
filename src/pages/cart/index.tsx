import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { Container, UIButton } from '~/components/ui';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { CartItem } from '~/components/common/cart/cart-item';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { refetchFactory } from '~/services/utils';

/* CartPage Helpers */
interface CartPageProps {}

/* CartPage Constants */

/* CartPage Styles */
const StyledCartPageWrapper = styled.div`
  background-color: ${colors.primary};
  width: 100%;
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
  border: 1px solid ${colors.lightGray};
  border-radius: 6px;
  background-color: ${colors.white};
  text-align: center;
  padding: 20px 0;
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
`;

const titleText = css`
  float: left;
  padding-left: 30px;
`;

const titleP = css`
  text-align: center;
`;

/* CartPage Component  */
function CartPage(props: React.PropsWithChildren<CartPageProps>) {
  const { data: cart } = useQuery(queryEndpoints.getCard, {
    defaultValue: {},
  });
  const { mutation: clearCart } = useMutation(mutationEndPoints.clearCard, {
    refetchQueries: [refetchFactory(queryEndpoints.getCard, null, true)],
  });

  const handleClearCart = React.useCallback(() => {
    clearCart();
  }, [clearCart]);
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
                <p className={titleText} onClick={handleClearCart}>
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
            {cart.items && cart.items.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
          </StyledCartContentBox>
        </StyledCartContent>
        <StyledCartRightBox>
          <h3>Genel Toplam ({cart.quantity})</h3>
          <h2>{cart.totalPrice} TL</h2>
          <StyledCartCheckoutBtn>Siparisi Tamamla</StyledCartCheckoutBtn>
        </StyledCartRightBox>
      </StyledCartPageWrapper>
    </Container>
  );

  /* CartPage Lifecycle  */

  /* CartPage Functions  */

  return __;
}

export { CartPage };
