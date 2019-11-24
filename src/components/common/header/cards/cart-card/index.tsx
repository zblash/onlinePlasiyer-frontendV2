import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { UIButton } from '~/components/ui';
import { ICardResponse } from '~/services/helpers/backend-models';
import { useHistory } from 'react-router';

/* CartCard Helpers */
interface CartCardProps {
  cart: ICardResponse;
}

/* CartCard Constants */

/* CartCard Styles */
const StyledCartCardWrapper = styled.div`
  primary: #0075ff;
  wrapperbackground: #fff;
  white: #fff;
  danger: #e2574c;
  dangerdark: #b3362c;
  width: 300px;
`;

const StyledCartItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 15px !important;
  height: 100px;
`;

const StyledCartHeader = styled.div`
  padding: 15px;
  line-height: 21px;
  border-bottom: 1px solid #ddd;
`;

const StyledCartBottom = styled.div`
  padding: 15px;
  line-height: 21px;
  border-bottom: 1px solid #ddd;
`;

const StyledCartHeaderSpan = styled.span`
  position: absolute;
  right: 15px;
  top: 65px;
  line-height: 16px;
  font-size: 14px;
  color: #767676;
`;

const StyledCartImgDiv = styled.div`
  height: 100px !important;
  width: 40%;
  float: left;
`;

const StyledCartImg = styled.img`
  width: 100% !important;
  height: 100px !important;
`;

const StyledCartDes = styled.div`
  width: 55%;
  float: right;
`;

const StyledCartDesName = styled.p`
  font-size: 18px;
  margin: 0;
`;

const StyledCartDesP = styled.p`
  font-size: 12px;
  margin: 0;
`;

const StyledCartButton = styled(UIButton)`
  float: right;
  transition: background-color 0.3s;
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 4px 8px;
  :hover {
    background-color: ${colors.lightGray};
    color: ${colors.primaryDark};
    transition: background-color 0.3s;
  }
`;

const cartDesPrice = css`
  position: absolute;
  right: 15px;
  line-height: 24px;
  font-size: 16px;
`;

/* CartCard Component  */
function CartCard(props: React.PropsWithChildren<CartCardProps>) {
  const routerHistory = useHistory();
  const __ = (
    <StyledCartCardWrapper>
      <StyledCartHeader>
        <h3>Alisveris Sepetim</h3>
        <StyledCartHeaderSpan>{props.cart.quantity} Urun</StyledCartHeaderSpan>
      </StyledCartHeader>
      {props.cart.items.map(cartItem => (
        <StyledCartItem key={cartItem.id}>
          <StyledCartImgDiv>
            <StyledCartImg src={cartItem.productPhotoUrl} />
          </StyledCartImgDiv>
          <StyledCartDes>
            <StyledCartDesName>{cartItem.productName}</StyledCartDesName>
            <StyledCartDesP>Satici: {cartItem.sellerName}</StyledCartDesP>
            <StyledCartDesP>{cartItem.quantity} Adet</StyledCartDesP>
            <StyledCartDesP className={cartDesPrice}>{cartItem.totalPrice} TL</StyledCartDesP>
          </StyledCartDes>
        </StyledCartItem>
      ))}
      <StyledCartBottom>
        <span>Toplam: {props.cart.totalPrice} TL</span>
        <StyledCartButton onClick={() => routerHistory.push(`/cart`)}>Sepete Git</StyledCartButton>
      </StyledCartBottom>
    </StyledCartCardWrapper>
  );

  /* CartCard Lifecycle  */

  /* CartCard Functions  */

  return __;
}

export { CartCard };
