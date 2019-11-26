import * as React from 'react';
import lodashDebounce from 'lodash.debounce';
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

/* CartItem Component  */
function CartItem(props: React.PropsWithChildren<CartItemProps>) {
  /* CartItem Variables */
  const [quantity, setQuantity] = React.useState(props.cartItem.quantity);

  const applicationContext = useApplicationContext();

  const { mutation: changeQuantity, loading: changeQuantityLoading } = useMutation(mutationEndPoints.addToCard, {
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

  const handleChangeQuantityMutation = React.useCallback(
    lodashDebounce(() => {
      applicationContext.loading.show();
      changeQuantity().finally(() => {
        applicationContext.loading.hide();
      });
    }, 500),
    [quantity],
  );

  const handleQuantityChange = React.useCallback((e: any) => {
    setQuantity(parseInt(e.target.value, 10) > 0 ? e.target.value : 1);
  }, []);

  const handleQuantityMns = React.useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);

  const handleQuantityPlus = React.useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity]);

  const removeItemHandler = React.useCallback(() => {
    applicationContext.loading.show();
    removeToCart().finally(() => {
      applicationContext.loading.hide();
    });
  }, [applicationContext.loading, removeToCart]);

  /* CartItem Lifecycle  */
  React.useEffect(() => {
    if (quantity !== props.cartItem.quantity) {
      handleChangeQuantityMutation();
    }
  }, [handleChangeQuantityMutation, props.cartItem.quantity, quantity]);

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
          <StyledCartContentItemBoxQuantityInputBtnMinus onClick={handleQuantityMns}>
            -
          </StyledCartContentItemBoxQuantityInputBtnMinus>
          <StyledCartContentItemBoxQuantityInput type="number" value={quantity} onChange={handleQuantityChange} />
          <StyledCartContentItemBoxQuantityInputBtnPlus onClick={handleQuantityPlus}>
            +
          </StyledCartContentItemBoxQuantityInputBtnPlus>
        </div>
      </StyledCartContentItemBoxQuantity>
      <StyledCartContentItemBoxPrice>
        <strong className={cartItemTotalPrice}>{props.cartItem.totalPrice} TL</strong>
        <div className={floatRight}>
          <StyledCartContentItemBoxDeleteBtn onClick={removeItemHandler}>Sil</StyledCartContentItemBoxDeleteBtn>
        </div>
      </StyledCartContentItemBoxPrice>
    </StyledCartContentItemBox>
  );
}
const PureCartItem = React.memo(CartItem);

export { PureCartItem as CartItem };
