import * as React from 'react';
import { IconName } from '~/components/ui/icon';
import { Icon, Button } from '~/components/ui';
import styled, { css } from '~/styled';
import Tooltip from 'rc-tooltip';

/*
  MenuItem Helpers
*/
export interface MenuItemProps {
  iconName: IconName;
  text: string;
  cardContent: (closePopup: () => void) => React.ReactElement;
}

/*
  MenuItem Colors
*/
export const MenuItemColors = {
  wrapperHoverBackground: '#212121',
  wrapperActiveBackground: '#1c1c1c',
  text: '#fff',
  popupCardWrapperBackground: '#fff',
  popupCardWrapperShadow: '#ccc',
};

/*
  MenuItem Styles
*/

const textOpacityVariable = css.variable(0.4);
const StyledMenuItemText = styled.span`
  color: ${MenuItemColors.text};
  font-family: PT Sans, Helvetica, Arial, sans-serif;
  font-size: 14px;
  opacity: ${textOpacityVariable};
`;

const cssIconStyle = css`
  margin-right: 12px;
  opacity: ${textOpacityVariable.get()};
`;

const StyledMenuItemWrapper = styled(Button)`
  display: flex;
  padding: 0 24px;
  align-items: center;
  border-radius: 8px;
  :active {
    background-color: ${MenuItemColors.wrapperActiveBackground} !important;
  }
  :hover {
    ${textOpacityVariable.set(0.8)};
    background-color: ${MenuItemColors.wrapperHoverBackground};
  }
`;

const StyledPopuCardWrapper = styled.div`
  background-color: ${MenuItemColors.popupCardWrapperBackground};
  border-radius: 8px;
  box-shadow: ${MenuItemColors.popupCardWrapperShadow} 0 4px 16px;
`;

const MenuItem: React.SFC<MenuItemProps> = props => {
  const [isClosed, setIsClosed] = React.useState(false);
  const tooltipProps = isClosed ? { visible: false } : {};

  const __ = (
    <Tooltip
      overlay={
        typeof props.cardContent === 'function' ? (
          <StyledPopuCardWrapper>{props.cardContent(() => setIsClosed(true))}</StyledPopuCardWrapper>
        ) : (
          <span />
        )
      }
      placement="bottom"
      trigger="click"
      {...tooltipProps}
    >
      <StyledMenuItemWrapper onClick={() => setIsClosed(false)}>
        <Icon name={props.iconName} size={20} className={cssIconStyle} color={MenuItemColors.text} />
        <StyledMenuItemText>{props.text}</StyledMenuItemText>
      </StyledMenuItemWrapper>
    </Tooltip>
  );

  /*
  MenuItem Lifecycle
  */

  /*
  MenuItem Functions
  */

  return __;
};

export { MenuItem };
