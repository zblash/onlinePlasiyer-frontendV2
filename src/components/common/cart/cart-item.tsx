import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { UIButton } from '~/components/ui';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { refetchFactory } from '~/services/utils';
import { useApplicationContext } from '~/app/context';

/* CartItem Helpers */
interface CartItemProps {
  cartItem: ICartItemProp;
}

interface ICartItemProp {
  id: string;
  productBarcodeList: string[];
  productName: string;
  productId: string;
  productPhotoUrl: string;
  quantity: number;
  sellerName: string;
  totalPrice: number;
  discountedTotalPrice: number;
}
/* CartItem Constants */

/* CartItem Styles */

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
const marginZero = css`
  margin: 0;
`;
const discount = css`
  text-decoration: line-through;
  margin: 0;
`;
/* CartItem Component  */
function CartItem(props: React.PropsWithChildren<CartItemProps>) {
  /* CartItem Variables */
  const firstUpdate = React.useRef(true);
  const [quantity, setQuantity] = React.useState(props.cartItem.quantity);

  const applicationContext = useApplicationContext();

  const { mutation: changeQuantity } = useMutation(mutationEndPoints.addToCard, {
    variables: {
      specifyProductId: props.cartItem.productId,
      quantity,
    },
    refetchQueries: [refetchFactory(queryEndpoints.getCard, null, true)],
  });

  const { mutation: removeToCart } = useMutation(mutationEndPoints.removeItemFromCard, {
    variables: {
      id: props.cartItem.id,
    },
    refetchQueries: [refetchFactory(queryEndpoints.getCard, null, true)],
  });

  /* CartItem Callbacks */

  const removeItemHandler = React.useCallback(() => {
    applicationContext.loading.show();
    removeToCart().finally(() => {
      applicationContext.loading.hide();
    });
  }, [applicationContext.loading, removeToCart]);

  /* CartItem Lifecycle  */
  React.useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;

      return;
    }

    if (quantity > 0) {
      applicationContext.loading.show();
      changeQuantity().finally(() => {
        applicationContext.loading.hide();
      });
    }
  }, [quantity]); // eslint-disable-line

  return (
    <StyledCartContentItemBox>
      <StyledCartContentItemBoxImgDiv>
        <img alt={props.cartItem.productName} className={cartItemImg} src={props.cartItem.productPhotoUrl} />
      </StyledCartContentItemBoxImgDiv>
      <StyledCartContentItemBoxDetail>
        <h3 className={cartItemTitle}>{props.cartItem.productName}</h3>
        <p className={cartItemBoxP}>
          <strong>Satici: </strong>
          {props.cartItem.sellerName}
        </p>
        <p className={cartItemBoxP}>
          <strong>Barkod: </strong>
          {props.cartItem.productBarcodeList.join(',')}
        </p>
      </StyledCartContentItemBoxDetail>
      <StyledCartContentItemBoxQuantity>
        <div className={itemQuantityInputDiv}>
          <StyledCartContentItemBoxQuantityInputBtnMinus name="mns" onClick={() => setQuantity(quantity - 1)}>
            -
          </StyledCartContentItemBoxQuantityInputBtnMinus>
          <StyledCartContentItemBoxQuantityInput type="number" name="quantityInp" value={quantity} disabled />
          <StyledCartContentItemBoxQuantityInputBtnPlus name="pls" onClick={() => setQuantity(quantity + 1)}>
            +
          </StyledCartContentItemBoxQuantityInputBtnPlus>
        </div>
      </StyledCartContentItemBoxQuantity>
      <StyledCartContentItemBoxPrice>
        <strong className={cartItemTotalPrice}>
          {props.cartItem.discountedTotalPrice < props.cartItem.totalPrice && (
            <p className={discount}>{props.cartItem.totalPrice} TL</p>
          )}
          <p className={marginZero}>{props.cartItem.discountedTotalPrice} TL</p>
        </strong>
        <div className={floatRight}>
          <StyledCartContentItemBoxDeleteBtn onClick={removeItemHandler}>Sil</StyledCartContentItemBoxDeleteBtn>
        </div>
      </StyledCartContentItemBoxPrice>
    </StyledCartContentItemBox>
  );
}
const PureCartItem = React.memo(CartItem);

export { PureCartItem as CartItem };
