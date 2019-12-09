import * as React from 'react';
import styled from '~/styled';
import { HeaderLogo } from './header-logo';
import { MenuItemProps, MenuItem } from './menu-item';
import { HeaderSearchBar } from './search-bar';
import { AccountCard } from './cards/account-card';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useUserPermissions } from '~/app/context';

/*
  Header Helpers
*/
interface HeaderProps {}

/*
  Header Colors // TODO : move theme.json
*/
const HeaderColors = {
  wrapperBackground: '#262626',
};

/*
  Header Strings 
*/

const HeaderStrings = {
  accont: 'Hesap',
  login: 'Oturum Ac',
  register: 'Kayit Ol',
  shopingBasket: 'Sepet',
};

/*
  Header Styles
*/

const StyledHeaderStickyWrapper = styled.div`
  background-color: ${HeaderColors.wrapperBackground};
  height: 56px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 0 48px 0 24px;
  display: flex;
  align-items: center;
  z-index: 2;
`;
const HeaderBack = styled.div`
  height: 56px;
  opacity: 0;
`;

const StyledMenuItemsWrapper = styled.div`
  display: flex;
  height: 100%;
  margin-left: auto;
`;

const _Header: React.SFC<HeaderProps> = props => {
  const { data: cart } = useQuery(queryEndpoints.getCard, {
    defaultValue: { quantity: 0, items: [] },
  });

  const userPermissions = useUserPermissions();

  const menuItems: MenuItemProps[] = React.useMemo(
    () => [
      {
        id: 'account-card',
        iconName: 'account',
        text: HeaderStrings.accont,
        cardContent: close => <AccountCard close={close} />,
      },
      {
        id: 'shoping-basket',
        iconName: 'shopingBasket',
        text: `Sepet (${cart.quantity})`,
        link: '/cart',
      },
    ],
    [cart.quantity],
  );

  return (
    <>
      <StyledHeaderStickyWrapper>
        <HeaderLogo />
        <HeaderSearchBar />
        <StyledMenuItemsWrapper>
          {menuItems
            .filter(item => item.id !== 'shoping-basket' || userPermissions.showCart)
            .map(item => (
              <MenuItem {...item} key={item.id} />
            ))}
        </StyledMenuItemsWrapper>
      </StyledHeaderStickyWrapper>
      <HeaderBack />
    </>
  );
};

const Header = _Header;

export { Header };
