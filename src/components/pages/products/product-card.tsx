import * as React from 'react';
import styled, { StylableProps } from '~/styled';
import { Button } from '~/components/ui';

/*
  ProductCard Helpers
*/
interface ProductCardProps extends StylableProps {}

/*
  ProductCard Colors
*/
export const ProductCardColors = {
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
  box-shadow: #cccccc 0 0 16px;
  overflow: hidden;

  height: 310px;
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

const StyledPreviewButton = styled(Button)`
  display: inline-block;
  border: 1px solid #0075ff;
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
    background-color: #0075ff;
  }
  :active {
    background-color: #0062d4;
  }
  transition: background-color 0.3s, color 0.3s;
`;

const ProductCard: React.SFC<ProductCardProps> = props => {
  const __ = (
    <StyledCardWrapper className={props.className}>
      <StyledShadowElement />
      <StyledCardImgWrapper>
        <StyledCardImg src="https://picsum.photos/701/901" />
      </StyledCardImgWrapper>
      <StyledContent>
        <StyledTitle>Kuru Fasulye</StyledTitle>
        <StyledPreviewButton>Fiyatlari Gor</StyledPreviewButton>
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
