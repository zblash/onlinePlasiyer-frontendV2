import * as React from 'react';
import styled from '~/styled';
import { HeaderLogo } from './header-logo';
import { MenuItemProps, MenuItem } from './menu-item';
import { HeaderSearchBar } from './search-bar';
import { LoginCard } from './cards/login-card';
import { WithAuthUserComponentProps, withAuthUser } from '~/components/hoc/with-auth-user';
import { AccountCard } from './cards/account-card';

/*
  Header Helpers
*/
interface HeaderProps extends WithAuthUserComponentProps {}

/*
  Header Colors
*/
export const HeaderColors = {
  wrapperBackground: '#262626',
};

/*
  Header Styles
*/

const StyledHeaderStickyWrapper = styled.div`
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

const _Header: React.SFC<HeaderProps> = props => {
  const isUserLogin = props.isLoggedIn;
  const menuItems: MenuItemProps[] = isUserLogin
    ? [
        {
          iconName: 'account',
          text: 'Hesap',
          cardContent: () => <AccountCard />,
        },
        {
          iconName: 'shopingBasket',
          text: 'Sepet (3)',
          cardContent: null,
        },
      ]
    : [
        {
          iconName: 'login',
          text: 'Oturum Ac',
          cardContent: closeCard => <LoginCard onSuccess={closeCard} />,
        },
      ];

  const __ = (
    <StyledHeaderStickyWrapper>
      <HeaderLogo />
      <HeaderSearchBar />
      <StyledMenuItemsWrapper>
        {menuItems.map(item => (
          <MenuItem {...item} key={item.text} />
        ))}
      </StyledMenuItemsWrapper>
    </StyledHeaderStickyWrapper>
  );

  /*
  Header Lifecycle
  */

  /*
  Header Functions
  */

  return __;
};

const Header = withAuthUser(_Header);

export { Header };
