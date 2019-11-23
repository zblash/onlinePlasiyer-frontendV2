import * as React from 'react';
import { UICollapsible, UIButton } from '~/components/ui';
import styled, { colors, css } from '~/styled';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

/* SpecifyAddtoCart Helpers */
interface SpecifyAddtoCartProps{
    specifyProductId: string;
}

/* SpecifyAddtoCart Constants */

/* SpecifyAddtoCart Styles */
const StyledAddCartInput = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  height: 25px;
  float: left;
  margin-right : 5px;
`; 

const WrapperTableCartColumn = styled.div`

`;

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

const tableStyle = css`
  margin-bottom: 16px;
`;

const tableColumnCartInputStyle = css`
  float: left;
  margin-right : 5px;
  margin-top: 2px;
`;

/* SpecifyAddtoCart Component  */
function SpecifyAddtoCart(props:React.PropsWithChildren<SpecifyAddtoCartProps>){
const [quantity, setQuantity] = useState(0);

const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(quantity);
}

const handleChange = (e:any) => {
    e.preventDefault();
    setQuantity(e.target.value);
}

const __ = (<WrapperTableCartColumn key={props.specifyProductId}>
    <label className={tableColumnCartInputStyle}>Adet: </label><StyledAddCartInput value={quantity} onChange={handleChange} />
    <StyledAddCartButton onClick={handleSubmit}>Sepete Ekle</StyledAddCartButton>
    </WrapperTableCartColumn>);

/* SpecifyAddtoCart Lifecycle  */

/* SpecifyAddtoCart Functions  */

return __;

};

export { SpecifyAddtoCart } 