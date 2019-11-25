import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { Container, UIButton } from '~/components/ui';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';

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

const StyledCartContentItemBox = styled.div`
    width: 100%;
    border-bottom 1px solid ${colors.lightGray};
    padding: 15px 0 15px 0;
    float: left;
`;

const StyledCartContentItemBoxImgDiv = styled.div`
  width: 19%;
  float: left;
  margin-left: 3%;
  height: 75px;
`;

const StyledCartContentItemBoxDetail = styled.div`
  width: 25%;
  float: left;
  margin-left: 2%;
  height: 75px;
`;

const StyledCartContentItemBoxQuantity = styled.div`
  width: 19%;
  float: left;
  margin-left: 1%;
  height: 75px;
  display: flex;
  align-items: center;
`;

const StyledCartContentItemBoxPrice = styled.div`
  width: 29%;
  float: left;
  margin-left: 1%;
  height: 75px;
  text-align: center;
`;

const StyledCartContentItemBoxDeleteBtn = styled(UIButton)`
  float: right;
  border-radius: 100px 
  background-color: ${colors.lightGray};
  color: ${colors.dangerDark};
  padding: 4px 8px;
  :hover {
    background-color: ${colors.lightGray};
    color: ${colors.dangerDark};
  }
  :active {
    background-color: ${colors.lightGray} !important;
    color: ${colors.dangerDark};
  }
`;

const StyledCartContentItemBoxQuantityInput = styled.input`
  float: left;
  background: #fff;
  border: none;
  width: 45px;
  height: 30px;
  line-height: 32px;
  text-align: center;
  padding: 0 5px;
  border-top: 1px solid ${colors.darkGray};
  border-bottom: 1px solid ${colors.darkGray};
`;

const StyledCartContentItemBoxQuantityInputBtnMinus = styled.button`
  color: ${colors.primary};
  border: 1px solid ${colors.darkGray};
  background-color: ${colors.lightGray};
  border-right: none;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  width: 30px;
  float: left;
  height: 32px;
`;

const StyledCartContentItemBoxQuantityInputBtnPlus = styled.button`
  color: ${colors.primary};
  border: 1px solid ${colors.darkGray};
  background-color: ${colors.lightGray};
  border-left: none;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  width: 30px;
  height: 32px;
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

const cartItemImg = css`
  width: 100%;
  height: 75px;
`;

const cartItemTitle = css`
  font-size: 16px;
  margin: 0;
`;

const cartItemBoxP = css`
  font-size: 12px;
  width: 100%;
  margin: 0;
`;

const cartItemTotalPrice = css`
  font-size: 20px;
`;

const floatRight = css`
  float: right;
  width: 100%;
`;

const itemQuantityInputDiv = css`
  width: 115px;
  margin auto;
`;

/* CartPage Component  */
function CartPage(props: React.PropsWithChildren<CartPageProps>) {
  const { data: cart } = useQuery(queryEndpoints.getCard, {
    defaultValue: {},
  });
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
                <p className={titleText}>Sepeti Temizle</p>
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
                <StyledCartContentItemBox key={cartItem.id}>
                  <StyledCartContentItemBoxImgDiv>
                    <img alt={cartItem.productName} className={cartItemImg} src={cartItem.productPhotoUrl} />
                  </StyledCartContentItemBoxImgDiv>
                  <StyledCartContentItemBoxDetail>
                    <h3 className={cartItemTitle}>{cartItem.productName}</h3>
                    <p className={cartItemBoxP}>
                      <strong>Satici: </strong>
                      {cartItem.sellerName}
                    </p>
                    <p className={cartItemBoxP}>
                      <strong>Barkod: </strong>
                      {cartItem.productBarcodeList.join(',')}
                    </p>
                  </StyledCartContentItemBoxDetail>
                  <StyledCartContentItemBoxQuantity>
                    <div className={itemQuantityInputDiv}>
                      <StyledCartContentItemBoxQuantityInputBtnMinus>-</StyledCartContentItemBoxQuantityInputBtnMinus>
                      <StyledCartContentItemBoxQuantityInput type="text" />
                      <StyledCartContentItemBoxQuantityInputBtnPlus>+</StyledCartContentItemBoxQuantityInputBtnPlus>
                    </div>
                  </StyledCartContentItemBoxQuantity>
                  <StyledCartContentItemBoxPrice>
                    <strong className={cartItemTotalPrice}>{cartItem.totalPrice} TL</strong>
                    <div className={floatRight}>
                      <StyledCartContentItemBoxDeleteBtn>Sil</StyledCartContentItemBoxDeleteBtn>
                    </div>
                  </StyledCartContentItemBoxPrice>
                </StyledCartContentItemBox>
              ))}
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
