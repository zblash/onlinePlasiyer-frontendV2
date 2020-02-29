import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { UIIcon, UILink } from '~/components/ui';
import { useApplicationContext } from '~/app/context';

/* AdminHeader Helpers */
interface AdminHeaderProps {}

/* AdminHeader Constants */

/* AdminHeader Styles */
const StyledAdminHeaderWrapper = styled.div`
  overflow: hidden;
  background-color: #404448;
  display: flex;
  justify-content: center;
`;

const StyledSubNavsButton = styled.button`
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  cursor: pointer;
  margin: 0;
`;
const StyledSubNavsLink = styled(UILink)`
  float: left;
  color: ${colors.whiteSolid};
  text-decoration: none;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  padding: 14px 16px;
`;
const StyledSubNavContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${colors.white};
  width: 19%;
  top: 106px;
  z-index: 1;
`;
const StyledSubNavContentItem = styled(UILink)`
  float: left;
  text-decoration: none;
  font-size: 16px;
  text-align: center;
  width: 100%;
  padding: 14px 0;
  cursor: pointer;
  color: ${colors.darkGray};
`;
const StyledSubNavs = styled.div`
  float: left;
  width: 20%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  :hover {
    ${StyledSubNavContent} {
      display: block;
    }
  }
`;
const iconStyle = css`
  display: inline;
  margin-left: 8px;
`;
/* AdminHeader Component  */
function HeaderMenu(props: React.PropsWithChildren<AdminHeaderProps>) {
  /* AdminHeader Variables */

  /* AdminHeader Callbacks */

  /* AdminHeader Lifecycle  */

  const applicationContext = useApplicationContext();

  const adminHeader = (
    <StyledAdminHeaderWrapper>
      <StyledSubNavs>
        <StyledSubNavsLink to="/">Anasayfa </StyledSubNavsLink>
      </StyledSubNavs>
      <StyledSubNavs>
        <StyledSubNavsButton>
          Kullanici Islemleri
          <UIIcon size={10} name="chevronDown" className={iconStyle} />
        </StyledSubNavsButton>
        <StyledSubNavContent>
          <StyledSubNavContentItem to="/users/create">Yeni Ekle</StyledSubNavContentItem>
          <StyledSubNavContentItem to="/users">Kullanicilari Gor</StyledSubNavContentItem>
          <StyledSubNavContentItem to="/orders">Tum Siparisleri Gor</StyledSubNavContentItem>
          <StyledSubNavContentItem to="/invoices">Tum Faturalari Gor</StyledSubNavContentItem>
        </StyledSubNavContent>
      </StyledSubNavs>
      <StyledSubNavs>
        <StyledSubNavsButton>
          Urun Islemleri
          <UIIcon size={10} name="chevronDown" className={iconStyle} />
        </StyledSubNavsButton>
        <StyledSubNavContent>
          <StyledSubNavContentItem to="/all-products">Tum Urunleri Gor</StyledSubNavContentItem>
          <StyledSubNavContentItem to="/create-product">Yeni Urun Ekle</StyledSubNavContentItem>
        </StyledSubNavContent>
      </StyledSubNavs>
      <StyledSubNavs>
        <StyledSubNavsLink to="/product-specifies">Kullanici Urunleri</StyledSubNavsLink>
      </StyledSubNavs>
      <StyledSubNavs>
        <StyledSubNavsLink to="/all-categories">Kategori Islemleri</StyledSubNavsLink>
      </StyledSubNavs>
      <StyledSubNavs>
        <StyledSubNavsButton>
          Site Islemleri
          <UIIcon size={10} name="chevronDown" className={iconStyle} />
        </StyledSubNavsButton>
        <StyledSubNavContent>
          <StyledSubNavContentItem to="/create-notification">Bildirim Ekle</StyledSubNavContentItem>
          <StyledSubNavContentItem to="/all-notifications">Bildirimler</StyledSubNavContentItem>
          <StyledSubNavContentItem to="/create-announcement">Duyuru Ekle</StyledSubNavContentItem>
          <StyledSubNavContentItem to="/announcements">Duyurular</StyledSubNavContentItem>
          <StyledSubNavContentItem to="/all-credits">Sistem Kredileri</StyledSubNavContentItem>
          <StyledSubNavContentItem to="/all-obligations">Sistem Borclari</StyledSubNavContentItem>
          <StyledSubNavContentItem to="/my-tickets">Destek Talepleri</StyledSubNavContentItem>
        </StyledSubNavContent>
      </StyledSubNavs>
    </StyledAdminHeaderWrapper>
  );

  const merchantHeader = (
    <StyledAdminHeaderWrapper>
      <StyledSubNavs>
        <StyledSubNavsLink to="/merchant/home">Anasayfa </StyledSubNavsLink>
      </StyledSubNavs>
      <StyledSubNavs>
        <StyledSubNavsLink to="/all-products">Tum Urunler</StyledSubNavsLink>
      </StyledSubNavs>
      <StyledSubNavs>
        <StyledSubNavsButton>
          Urun Islemleri
          <UIIcon size={10} name="chevronDown" className={iconStyle} />
        </StyledSubNavsButton>
        <StyledSubNavContent>
          <StyledSubNavContentItem to="/product-specifies">Tum Urunleri Gor</StyledSubNavContentItem>
          <StyledSubNavContentItem to="/add-product-specify">Yeni Urun Ekle</StyledSubNavContentItem>
        </StyledSubNavContent>
      </StyledSubNavs>
      <StyledSubNavs>
        <StyledSubNavsLink to="/credit-activities">Cari Ekstrelerini Gor</StyledSubNavsLink>
      </StyledSubNavs>
      <StyledSubNavs>
        <StyledSubNavsLink to="/orders">Siparisleri Gor</StyledSubNavsLink>
      </StyledSubNavs>
      <StyledSubNavs>
        <StyledSubNavsButton>
          Destek Islemleri
          <UIIcon size={10} name="chevronDown" className={iconStyle} />
        </StyledSubNavsButton>
        <StyledSubNavContent>
          <StyledSubNavContentItem to="/create-ticket">Destek Talebi Olustur</StyledSubNavContentItem>
          <StyledSubNavContentItem to="/my-tickets">Destek Taleplerim</StyledSubNavContentItem>
        </StyledSubNavContent>
      </StyledSubNavs>
    </StyledAdminHeaderWrapper>
  );

  const customerHeader = (
    <StyledAdminHeaderWrapper>
      <StyledSubNavs>
        <StyledSubNavsLink to="/">Anasayfa </StyledSubNavsLink>
      </StyledSubNavs>
      <StyledSubNavs>
        <StyledSubNavsLink to="/credit-activities">Cari Ekstreleri Gor</StyledSubNavsLink>
      </StyledSubNavs>
      <StyledSubNavs>
        <StyledSubNavsLink to="/orders">Siparisleri Gor</StyledSubNavsLink>
      </StyledSubNavs>
      <StyledSubNavs>
        <StyledSubNavsButton>
          Destek Islemleri
          <UIIcon size={10} name="chevronDown" className={iconStyle} />
        </StyledSubNavsButton>
        <StyledSubNavContent>
          <StyledSubNavContentItem to="/create-ticket">Destek Talebi Olustur</StyledSubNavContentItem>
          <StyledSubNavContentItem to="/my-tickets">Destek Taleplerim</StyledSubNavContentItem>
        </StyledSubNavContent>
      </StyledSubNavs>
    </StyledAdminHeaderWrapper>
  );

  return applicationContext.user.isAdmin
    ? adminHeader
    : applicationContext.user.isMerchant
    ? merchantHeader
    : customerHeader;
}
const PureHeaderMenu = React.memo(HeaderMenu);

export { PureHeaderMenu as HeaderMenu };
