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

/* CartPage Helpers */
interface CartPageProps {}

interface ISellers {
  id: string;
  isChecked: boolean;
  quantity: number;
  totalPrice: number;
  discountedTotalPrice: number;
  paymentMethod: string;
}
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
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
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
  margin: 0 auto 5px auto;
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
const StyledCheckbox = styled.label`
  display: flex;

  > input.check {
    position: absolute;
    opacity: 0;
  }
  > input.check:checked + label svg path {
    stroke-dashoffset: 0;
  }
  > input.check:focus + label {
    transform: scale(1.03);
  }

  > .check + label {
    display: block;
    border: 2px solid #333;
    width: 16px;
    height: 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  > .check + label:active {
    transform: scale(1.05);
    border-radius: 30px;
  }
  > .check + label svg {
    pointer-events: none;
  }
  > .check + label svg path {
    fill: none;
    stroke: #333;
    stroke-width: 4px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 100;
    stroke-dashoffset: 101;
    transition: all 350ms cubic-bezier(1, 0, 0.37, 0.91);
  }
`;
const StyledPaymentSelect = styled.select`
  border: 1px solid ${colors.lightGray};
  border-radius: 5px;
  background: none;
  margin: 1em 0 1em 0;
  padding: 5px 10px;
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
const sellerTab = css`
  display: flex;
`;
const headCheckbox = css`
  padding: 2% 0 2% 3%;
`;
const discount = css`
  text-decoration: line-through;
  margin: 0;
`;
/* CartPage Component  */
function CartPage(props: React.PropsWithChildren<CartPageProps>) {
  const applicationContext = useApplicationContext();
  const routerHistory = useHistory();
  const [paymentMethod, setPaymentMethod] = React.useState();
  const [holderId, setHolderId] = React.useState();

  const [checkoutFlag, setCheckoutFlag] = React.useState(false);
  const [allCheck, setAllCheck] = React.useState(true);
  const [sellerIds, setSellerIds] = React.useState<Array<ISellers>>([]);
  const { data: cart } = useQuery(queryEndpoints.getCard, {
    defaultValue: {},
  });
  const { mutation: clearCart } = useMutation(mutationEndPoints.clearCard, {
    refetchQueries: [refetchFactory(queryEndpoints.getCard, null, true)],
  });

  const { mutation: checkoutCart } = useMutation(mutationEndPoints.cardCheckout, {
    variables: { sellerIdList: sellerIds.filter(item => item.isChecked).map(item => item.id) },
    refetchQueries: [refetchFactory(queryEndpoints.getCard, null)],
  });

  const { data: paymentMethods, loading: methodsLoading } = useQuery(queryEndpoints.getPaymentMethods, {
    defaultValue: [],
  });
  const { mutation: setPayment } = useMutation(mutationEndPoints.cartSetPayment, {
    variables: {
      paymentOption: paymentMethod,
      holderId,
    },
  });
  const { data: creditSummary } = useQuery(queryEndpoints.getCredit, {
    defaultValue: {
      creditLimit: 0,
      totalDebt: 0,
    },
  });
  /* CartPage Lifecycle  */

  React.useEffect(() => {
    if (paymentMethod && holderId) {
      setPayment();
    }
  }, [paymentMethod, holderId]); // eslint-disable-line
  React.useEffect(() => {
    const sellers = sellerIds.filter(item => item.isChecked);

    setCheckoutFlag(sellers.length > 0 && sellers.every(item => item.paymentMethod));
  }, [sellerIds]);
  React.useEffect(() => {
    if (cart && cart.items) {
      const sellers = cart.items.map(item => {
        return {
          id: item.id,
          isChecked: true,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
          discountedTotalPrice: item.discountedTotalPrice,
          paymentMethod: undefined,
        };
      });
      setSellerIds(sellers);
    }
  }, [cart]);

  /* CartPage Functions  */
  const handleChangePaymentMethod = React.useCallback(
    (e: any) => {
      const id = e.target.id.replace('payment-', '');
      const { value } = e.target;
      const sellers = sellerIds.map(item => (item.id === id ? { ...item, paymentMethod: value } : item));
      if (value) {
        setPaymentMethod(value);
        setHolderId(id);
      }
      setSellerIds(sellers);
    },
    [sellerIds],
  );
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

  const handleSubmitSellers = React.useCallback(
    e => {
      const sellers =
        e.target.name === 'checkAllSellers'
          ? sellerIds.map(item => {
              return { ...item, isChecked: e.target.checked };
            })
          : sellerIds.map(item => (item.id === e.target.value ? { ...item, isChecked: e.target.checked } : item));
      setSellerIds(sellers);
      setAllCheck(sellers.every(item => item.isChecked));
    },
    [sellerIds, setAllCheck],
  );
  const __ = (
    <Container>
      <CategoryHorizontalListFetcher shouldUseProductsPageLink />
      <StyledCartPageWrapper>
        <StyledCartContent>
          <StyledCartContentHeader>
            <h3>Alisveris Sepetim</h3>
            {creditSummary && (
              <p>
                <span>
                  Sistem'e Olan Borcunuz: <strong>{creditSummary.totalDebt} &#8378; </strong>
                </span>
                <br />
                <span>
                  Sistem Kredi Limitiniz: <strong>{creditSummary.creditLimit} &#8378; </strong>
                </span>
              </p>
            )}
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
            <StyledCartContentBoxTitle>
              <StyledCheckbox className={headCheckbox}>
                <input
                  type="checkbox"
                  className="check"
                  name="checkAllSellers"
                  id="checkboxAll"
                  checked={allCheck}
                  onChange={e => handleSubmitSellers(e)}
                />
                <label htmlFor="checkboxAll">
                  <svg viewBox="0,0,50,50">
                    <path d="M5 30 L 20 45 L 45 5" />
                  </svg>
                </label>
                <label>Tumunu Sec</label>
              </StyledCheckbox>
            </StyledCartContentBoxTitle>
            {cart &&
              cart.items &&
              sellerIds.length > 0 &&
              cart.items.map(cartItem => (
                <CartItemWrapper key={cartItem.id}>
                  <CartItemHeader>
                    <p className={sellerTab}>
                      {sellerIds.length > 0 && (
                        <StyledCheckbox>
                          <input
                            type="checkbox"
                            className="check"
                            name={sellerIds.find(item => item.id === cartItem.id).id}
                            id={cartItem.sellerId}
                            checked={sellerIds.find(item => item.id === cartItem.id).isChecked}
                            value={cartItem.id}
                            onChange={e => handleSubmitSellers(e)}
                          />
                          <label htmlFor={cartItem.id}>
                            <svg viewBox="0,0,50,50">
                              <path d="M5 30 L 20 45 L 45 5" />
                            </svg>
                          </label>
                        </StyledCheckbox>
                      )}
                      <span>Satici : </span>
                      <strong>{cartItem.sellerName}</strong>
                    </p>
                    {!methodsLoading && (
                      <div>
                        <StyledPaymentSelect id={`payment-${cartItem.id}`} onChange={handleChangePaymentMethod}>
                          <option value="">Odeme Yontemini Secin</option>
                          {paymentMethods.map(paymentOpt => (
                            <option value={paymentOpt.paymentOption}>{paymentOpt.displayName}</option>
                          ))}
                        </StyledPaymentSelect>
                      </div>
                    )}
                    <p>
                      Toplam :
                      {cartItem.discountedTotalPrice < cartItem.totalPrice && (
                        <span className={discount}> {cartItem.totalPrice} TL </span>
                      )}
                      {cartItem.discountedTotalPrice} TL ({cartItem.quantity} Adet)
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
          {sellerIds.length > 0 && (
            <StyledCartCheckoutBox>
              <h3>
                Genel Toplam (
                {sellerIds
                  .filter(item => item.isChecked)
                  .map(item => item.quantity)
                  .reduce((a, c) => {
                    return a + c;
                  }, 0)}
                )
              </h3>
              <h2>
                {sellerIds
                  .filter(item => item.isChecked)
                  .map(item => item.discountedTotalPrice)
                  .reduce((a, c) => {
                    return a + c;
                  }, 0)}{' '}
                TL
              </h2>
              <StyledCartCheckoutBtn disabled={!checkoutFlag} onClick={handleCartCheckout}>
                Siparisleri Onayla
              </StyledCartCheckoutBtn>
            </StyledCartCheckoutBox>
          )}
        </StyledCartRightBox>
      </StyledCartPageWrapper>
    </Container>
  );

  return __;
}

export { CartPage };
