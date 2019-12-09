import * as React from 'react';
import styled, { StylableProps, css, colors } from '~/styled';
import { UIButton, UIIcon } from '~/components/ui';
import { Trans } from '~/i18n';
import { usePopupContext } from '~/contexts/popup/context';
import { useUserPermissions } from '~/app/context';

/*
  ProductCard Helpers
*/
export interface ProductData {
  id: string;
  name: string;
  photoUrl: string;
  tax: number;
  barcodeList: string[];
}

interface ProductCardProps extends StylableProps, ProductData {
  onButtonClick?: () => void;
  isExpand?: boolean;
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
  barcode: 'Barkod Listesi',
};

/*
  ProductCard Styles
*/

const StyledCardImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 350ms;
`;
const StyledCardImgWrapper = styled.div`
  width: 100%;
  max-height: 160px;
  overflow: hidden;
  transition: max-height 0.5s linear;
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
  transition: height 0.5s linear;
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
    ${StyledCardImgWrapper} {
      max-height: 0;

    }
    ${StyledContent} {
      height: 280px;
    }
    .${deleteIconStyle}{
      opacity: 1;
    }
  }
`;

const StyledTitle = styled.h2`
  margin: 0;
`;

const StyledButtonTextWrapper = styled.span`
  transform: translate(20px, 0px);
  transition: transform 1s;
`;

const StyledPreviewButton = styled(UIButton)<{ isExpand: boolean }>`
  display: flex;
  border: 1px solid ${props => (props.isExpand ? colors.danger : colors.primary)};
  background-color: ${colors.white};
  color: ${props => (props.isExpand ? colors.danger : colors.primary)};
  text-align: center;
  cursor: pointer;
  margin: 1px 4px 0;
  line-height: 1.5;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 2px;
  justify-content: center;
  :hover {
    color: ${colors.white};
    background-color: ${props => (props.isExpand ? colors.danger : colors.primary)};
    ${StyledButtonTextWrapper} {
      transform: translate(0px, 0px);
      transition: transform 0.5s;
    }
  }
  :active {
    background-color: ${props => (props.isExpand ? colors.dangerDark : colors.primaryDark)};
  }
  transition: background-color 0.3s, color 0.3s;
`;

const StyledContentCenter = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledContentSpan = styled.span``;
const StyledContentHeader = styled.h2`
  margin: 0;
`;
const buttonIconStyle = css`
  margin-left: 8px;
`;

const ProductCard: React.SFC<ProductCardProps> = props => {
  const userPermission = useUserPermissions();
  const popups = usePopupContext();
  const [showDetails, setShowDetails] = React.useState(false);

  const handleHover = React.useCallback(
    (canShow: boolean) => {
      setShowDetails(canShow);
    },
    [setShowDetails],
  );

  const __ = (
    <StyledCardWrapper
      className={props.className}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <StyledCardImgWrapper>
        <StyledCardImg src={props.photoUrl} />
      </StyledCardImgWrapper>
      <StyledContent>
        {userPermission.product.delete && (
          <UIIcon
            size={18}
            name="trash"
            className={deleteIconStyle}
            color={ProductCardColors.danger}
            onClick={e => {
              e.stopPropagation();
              popups.deleteProduct.show(props);
            }}
          />
        )}
        <StyledTitle>{props.name}</StyledTitle>
        <StyledContentCenter>
          <StyledContentSpan>
            {ProductCardStrings.taxRate} %{props.tax}
          </StyledContentSpan>

          {showDetails && (
            <>
              <StyledContentHeader>{ProductCardStrings.barcode}</StyledContentHeader>
              {props.barcodeList.map(x => (
                <StyledContentSpan key={x}>{x}</StyledContentSpan>
              ))}
              <StyledContentHeader>{ProductCardStrings.barcode}</StyledContentHeader>
              <StyledContentSpan>asdasd</StyledContentSpan>
              <StyledContentSpan>asdasd</StyledContentSpan>
            </>
          )}
        </StyledContentCenter>
        <StyledPreviewButton onClick={props.onButtonClick} isExpand={props.isExpand}>
          <Trans i18nKey={props.isExpand ? 'product-card.hide-price' : 'product-card.show-price'}>
            <StyledButtonTextWrapper />
            <UIIcon
              color={colors.white}
              name={props.isExpand ? 'chevronUp' : 'chevronDown'}
              className={buttonIconStyle}
            />
          </Trans>
        </StyledPreviewButton>
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
