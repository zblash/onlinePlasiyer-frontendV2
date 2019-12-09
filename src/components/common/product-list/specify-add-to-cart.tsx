import * as React from 'react';
import { UIButton } from '~/components/ui';
import styled, { colors, css } from '~/styled';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { refetchFactory } from '~/services/utils';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useAlert } from '~/utils/hooks';

/* SpecifyAddtoCart Helpers */
interface SpecifyAddtoCartProps {
  specifyProductId: string;
}

/* SpecifyAddtoCart Constants */

/* SpecifyAddtoCart Styles */
const StyledAddCartInput = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  height: 25px;
  float: left;
  margin-right: 5px;
`;

const WrapperTableCartColumn = styled.div``;

const StyledAddCartButton = styled(UIButton)`
  align-items: center;
  float: left;
  transition: background-color 0.3s;
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 4px 8px;
  border-radius: 8px;
  :active {
    background-color: ${colors.primaryDark} !important;
  }
  :hover {
    background-color: ${colors.lightGray};
  }
`;

const tableColumnCartInputStyle = css`
  float: left;
  margin-right: 5px;
  margin-top: 2px;
`;

/* SpecifyAddtoCart Component  */
function SpecifyAddtoCart(props: React.PropsWithChildren<SpecifyAddtoCartProps>) {
  const alertContext = useAlert();
  const [quantity, setQuantity] = React.useState(1);
  const { mutation: addToCart, error: addToCartError } = useMutation(mutationEndPoints.addToCard, {
    variables: {
      specifyProductId: props.specifyProductId,
      quantity,
    },
    refetchQueries: [refetchFactory(queryEndpoints.getCard, null, true)],
  });

  const handleChange = React.useCallback(
    (e: any) => {
      e.preventDefault();
      setQuantity(parseInt(e.target.value, 10) > 0 ? e.target.value : 1);
    },
    [setQuantity],
  );
  const handleAddToCart = React.useCallback(() => {
    addToCart();
    if (!addToCartError) {
      alertContext.show('Urun Sepete Eklendi', { type: 'success' });
    }
  }, [alertContext, addToCart, addToCartError]);

  /* SpecifyAddtoCart Lifecycle  */

  /* SpecifyAddtoCart Functions  */
  const __ = (
    <WrapperTableCartColumn key={props.specifyProductId}>
      <label className={tableColumnCartInputStyle}>Adet: </label>
      <StyledAddCartInput type="number" value={quantity} onChange={handleChange} />
      <StyledAddCartButton onClick={handleAddToCart}>Sepete Ekle</StyledAddCartButton>
    </WrapperTableCartColumn>
  );

  return __;
}

export { SpecifyAddtoCart };
