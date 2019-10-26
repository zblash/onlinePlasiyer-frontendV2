import * as React from 'react';
import styled, { StylableProps } from '~/styled';
import { UIButton } from '~/components/ui';

/*
  ProductCard Helpers
*/
export interface ProductData {
  id: string;
  name: string;
  img: string;
}

interface ProductCardProps extends StylableProps, ProductData {
  onButtonClick?: () => void;
}

/*
  ProductCard Colors
*/
export const ProductCardColors = {
  primary: '#0075ff',
  primaryDark: '#0062d4',
  wrapperBackground: '#fff',
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
  }
`;

const StyledContent = styled.div`
  height: 120px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
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

const ProductCard: React.SFC<ProductCardProps> = props => {
  const __ = (
    <StyledCardWrapper className={props.className}>
      <StyledShadowElement />
      <StyledCardImgWrapper>
        <StyledCardImg src={props.img} />
      </StyledCardImgWrapper>
      <StyledContent>
        <StyledTitle>{props.name}</StyledTitle>
        <StyledPreviewButton onClick={props.onButtonClick}>Fiyatlari Gor</StyledPreviewButton>
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
