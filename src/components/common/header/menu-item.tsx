import * as React from 'react';
import { IconName } from '~/components/ui/icon';
import { Icon, Button } from '~/components/ui';
import styled, { css, createCssVariable } from '~/styled';

/*
  MenuItem Helpers
*/
export interface MenuItemProps {
  iconName: IconName;
  text: string;
}

/*
  MenuItem Colors
*/
export const MenuItemColors = {
  wrapperHoverBackground: '#212121',
  wrapperActiveBackground: '#1c1c1c',
  text: '#fff',
};

/*
  MenuItem Styles
*/

const textOpacityVariable = createCssVariable(0.4);
const MenuItemText = styled.span`
  color: ${MenuItemColors.text};
  font-family: PT Sans, Helvetica, Arial, sans-serif;
  font-size: 14px;
  opacity: ${textOpacityVariable};
`;

const iconStyle = css`
  margin-right: 12px;
  opacity: ${textOpacityVariable.get()};
`;

const MenuItemWrapper = styled(Button)`
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

const MenuItem: React.SFC<MenuItemProps> = props => {
  const __ = (
    <MenuItemWrapper>
      <Icon name={props.iconName} size={20} className={iconStyle} color={MenuItemColors.text} />
      <MenuItemText>{props.text}</MenuItemText>
    </MenuItemWrapper>
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
