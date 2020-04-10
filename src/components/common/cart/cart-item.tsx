import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { UIButton } from '~/components/ui';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { refetchFactory } from '~/services/utils';
import { useApplicationContext } from '~/app/context';
import { ICardItemResponse } from '~/services/helpers/backend-models';

/* CartItem Helpers */
interface CartItemProps {
  cartItem: ICardItemResponse;
}

/* CartItem Constants */

/* CartItem Styles */

const StyledCartContentItemBoxDeleteBtn = styled(UIButton)`
  display: inherit;
  border-radius: 100px 
  background-color: ${colors.lightGray};
  color: ${colors.dangerDark};
  border: 1px solid ${colors.gray};
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
  border-radius: 10px;
`;

const cartItemTotalPrice = css`
  font-size: 20px;
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
    <>
      <tr>
        <td>
          <img alt={props.cartItem.productName} className={cartItemImg} src={props.cartItem.productPhotoUrl} />
        </td>
        <td>
          <p>{props.cartItem.productName}</p>
        </td>
        <td>
          <p>{props.cartItem.unitType}</p>
        </td>
        <td>
          <p>{props.cartItem.unitContents}</p>
        </td>
        <td>
          <p>{props.cartItem.unitPrice.toFixed(2)} TL</p>
        </td>
        <td>
          <p>{props.cartItem.recommendedRetailPrice.toFixed(2)} TL</p>
        </td>
        <td>
          <strong className={cartItemTotalPrice}>
            {props.cartItem.discountedTotalPrice < props.cartItem.totalPrice && (
              <p className={discount}>{props.cartItem.totalPrice.toFixed(2)} TL</p>
            )}
            <p className={marginZero}>{props.cartItem.discountedTotalPrice.toFixed(2)} TL</p>
          </strong>
        </td>
        <td>
          <div className={itemQuantityInputDiv}>
            <StyledCartContentItemBoxQuantityInputBtnMinus name="mns" onClick={() => setQuantity(quantity - 1)}>
              -
            </StyledCartContentItemBoxQuantityInputBtnMinus>
            <StyledCartContentItemBoxQuantityInput
              type="number"
              name="quantityInp"
              value={quantity}
              onChange={e => {
                if (parseInt(e.target.value, 10) > 0) {
                  setQuantity(parseInt(e.target.value, 10));
                }
              }}
            />
            <StyledCartContentItemBoxQuantityInputBtnPlus name="pls" onClick={() => setQuantity(quantity + 1)}>
              +
            </StyledCartContentItemBoxQuantityInputBtnPlus>
          </div>
        </td>
        <td>
          <StyledCartContentItemBoxDeleteBtn onClick={removeItemHandler}>Sil</StyledCartContentItemBoxDeleteBtn>
        </td>
      </tr>
    </>
  );
}
const PureCartItem = React.memo(CartItem);

export { PureCartItem as CartItem };
