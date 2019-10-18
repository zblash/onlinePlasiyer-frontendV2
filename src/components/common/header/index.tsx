import * as React from 'react';
import styled from '~/styled';
import { HeaderLogo } from './header-logo';
import { MenuItemProps, MenuItem } from './menu-item';
import { HeaderSearchBar } from './search-bar';

/*
  Header Helpers
*/
interface HeaderProps {}

/*
  Header Colors
*/
export const HeaderColors = {
  wrapperBackground: '#262626',
};

/*
  Header Styles
*/

const HeaderStickyWrapper = styled.div`
  background-color: ${HeaderColors.wrapperBackground};
  height: 56px;
  position: sticky;
  top: 0;
  padding: 0 48px 0 24px;
  display: flex;
  align-items: center;
  z-index: 2;
`;

const StyledMenuItemsWrapper = styled.div`
  display: flex;
  height: 100%;
  margin-left: auto;
`;

const Header: React.SFC<HeaderProps> = props => {
  const menuItems: MenuItemProps[] = [
    {
      iconName: 'account',
      text: 'Hesap',
    },
    {
      iconName: 'shopingBasket',
      text: 'Sepet (3)',
    },
  ];

  const __ = (
    <HeaderStickyWrapper>
      <HeaderLogo />
      <HeaderSearchBar />
      <StyledMenuItemsWrapper>
        {menuItems.map(item => (
          <MenuItem {...item} key={item.text} />
        ))}
      </StyledMenuItemsWrapper>
    </HeaderStickyWrapper>
  );

  /*
  Header Lifecycle
  */

  /*
  Header Functions
  */

  return __;
};

export { Header };
