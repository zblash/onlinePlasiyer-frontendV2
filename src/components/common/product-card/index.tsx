import * as React from 'react';
import styled, { StylableProps, css } from '~/styled';
import { UIButton, UIIcon } from '~/components/ui';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';

/*
  ProductCard Helpers
*/
export interface ProductData {
  id: string;
  name: string;
  img: string;
  taxRate: number;
  barcode: string;
}

interface ProductCardProps extends StylableProps, ProductData {
  onButtonClick?: () => void;
}

/*
  ProductCard Colors // TODO : move theme.json
*/
export const ProductCardColors = {
  primary: '#0075ff',
  primaryDark: '#0062d4',
  danger: '#e2574c',
  wrapperBackground: '#fff',
};

/*
  ProductCard Strings 
*/
export const ProductCardStrings = {
  taxRate: 'Vergi Orani',
  showPrice: 'Fiyatlari Goster',
  barcode: 'Barkod',
};

/*
  ProductCard Styles
*/

const StyledShadowElement = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  opacity: 0;
  height: 140px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 57%);
  transition: opacity 0.4s ease;
  z-index: 1;
`;
const StyledCardImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 350ms;
`;
const StyledCardImgWrapper = styled.div`
  width: 100%;
  height: 160px;
  overflow: hidden;
`;
const deleteIconStyle = css`
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 1;
  cursor: pointer;
  opacity: 0;
`;

const StyledContent = styled.div`
  position: relative;
  height: 120px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
`;

const StyledCardWrapper = styled.div`
  position: relative;
  margin: 0 16px 16px;

  padding: 0;
  font-size: 12px;
  border-radius: 4px;
  box-shadow: #cccccc 0 0 6px;
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  overflow: hidden;

  flex: 1;
  :hover {
    ${StyledShadowElement} {
      opacity: 1;
    }
    ${StyledCardImg} {
      transform: scale(1.5);
    }
    .${deleteIconStyle}{
      opacity: 1;
    }
  }
`;

const StyledTitle = styled.h2`
  margin: 0;
`;

const StyledPreviewButton = styled(UIButton)`
  display: inline-block;
  border: 1px solid ${ProductCardColors.primary};
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
  color: #0075ff;
  text-align: center;
  cursor: pointer;
  margin: 1px 4px 0;
  line-height: 1.5;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 2px;
  :hover {
    color: #fff;
    background-color: ${ProductCardColors.primary};
  }
  :active {
    background-color: ${ProductCardColors.primaryDark};
  }
  transition: background-color 0.3s, color 0.3s;
`;

const StyledContentCenter = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledContentSpan = styled.span``;
const ProductCard: React.SFC<ProductCardProps> = props => {
  const { mutation: removeProduct, loading } = useMutation(mutationEndPoints.removeProduct, {
    variables: { id: props.id },
  });
  const __ = (
    <StyledCardWrapper className={props.className}>
      <StyledShadowElement />
      <StyledCardImgWrapper>
        <StyledCardImg src={props.img} />
      </StyledCardImgWrapper>
      <StyledContent>
        <UIIcon
          size={18}
          name={loading ? 'loading' : 'trash'}
          className={deleteIconStyle}
          color={ProductCardColors.danger}
          onClick={e => {
            e.stopPropagation();
            if (!loading) {
              removeProduct();
            }
          }}
        />

        <StyledTitle>{props.name}</StyledTitle>
        <StyledContentCenter>
          <StyledContentSpan>
            {ProductCardStrings.taxRate} %{props.taxRate}
          </StyledContentSpan>
          <StyledContentSpan>
            {ProductCardStrings.barcode} : {props.barcode}
          </StyledContentSpan>
        </StyledContentCenter>
        <StyledPreviewButton onClick={props.onButtonClick}>{ProductCardStrings.showPrice}</StyledPreviewButton>
      </StyledContent>
    </StyledCardWrapper>
  );

  /*
  ProductCard Lifecycle
  */

  /*
  ProductCard Functions
  */

  return __;
};

export { ProductCard, StyledCardWrapper as ProductCardWrapper };
