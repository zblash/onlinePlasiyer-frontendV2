import * as React from 'react';
import styled, { colors } from '~/styled';
import { HeaderLogo } from './header-logo';
import { MenuItemProps, MenuItem } from './menu-item';
import { HeaderSearchBar } from './search-bar';
import { AccountCard } from './cards/account-card';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useUserPermissions, useApplicationContext } from '~/app/context';
import { UILink } from '~/components/ui';
import { logout } from '~/services/api';

/*
  Header Helpers
*/
interface HeaderProps {}

const HeaderStrings = {
  accont: 'Hesap',
  login: 'Oturum Ac',
  register: 'Kayit Ol',
  shopingBasket: 'Sepet',
  notifications: 'Bildirimler',
};

/*
  Header Styles
*/

const StyledHeaderStickyWrapper = styled.div`
  height: 56px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 0 48px 0 24px;
  display: flex;
  background-color: ${colors.black};
  color: ${colors.whiteSolid};
  align-items: center;
  z-index: 2;
`;
const HeaderBack = styled.div`
  height: 56px;
  opacity: 0;
`;
const StyledUserInfoWrapper = styled.div`
  display: flex;
  margin-left: auto;
  padding-right: 15px;
`;
const StyledMenuItemsWrapper = styled.div`
  display: flex;
  height: 100%;
`;
const StyledLink = styled(UILink)`
  display: flex;
  flex-direction: column;
  color: ${colors.whiteSolid};
`;

const _Header: React.SFC<HeaderProps> = props => {
  const userPermissions = useUserPermissions();
  const applicationContext = useApplicationContext();
  const { data: cart } = useQuery(queryEndpoints.getCard, {
    defaultValue: { quantity: 0, items: [] },
    skip: !applicationContext.user.isCustomer,
  });

  const menuItems: MenuItemProps[] = React.useMemo(
    () => [
      {
        id: 'notifications',
        iconName: 'alarm',
        text: HeaderStrings.notifications,
        cardContent: close => <AccountCard close={close} />,
      },
      {
        id: 'shoping-basket',
        iconName: 'shopingBasket',
        text: `Sepet (${cart.quantity})`,
        link: '/cart',
      },
      {
        id: 'logout',
        iconName: 'rightArrow',
        text: `Cikis Yap`,
        callback: logout,
      },
    ],
    [cart.quantity],
  );

  return (
    <>
      <StyledHeaderStickyWrapper>
        <HeaderLogo />
        <HeaderSearchBar />
        <StyledUserInfoWrapper>
          <StyledLink to="/profile">
            <span>
              <strong>Hosgeldin : </strong>
              {applicationContext.user.name}
            </span>
            <span>
              <strong>Bagli Sube : </strong>
              {applicationContext.user.address && applicationContext.user.address.stateName}
            </span>
          </StyledLink>
        </StyledUserInfoWrapper>
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
