import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { UIButton, UILink } from '~/components/ui';
import { useApplicationContext } from '~/app/context';
import { logout } from '~/services/api';
import { HeaderCardProps } from '../helpers';
import { useWindowEvent } from '~/utils/hooks';

/*
  AccountCard Helpers
*/
type AccountCardProps = HeaderCardProps;

/*
  AccountCard Colors // TODO : move theme.json
*/
const AccountCardColors = {
  primary: '#0075ff',
  wrapperBackground: '#fff',
  white: '#fff',
  danger: '#e2574c',
  dangerDark: '#b3362c',
};

/*
  AccountCard Styles
*/

const StyledLogoutButton = styled(UIButton)`
  border: 1px solid ${AccountCardColors.danger};
  background-color: ${AccountCardColors.white};
  margin-top: 3px;
  color: ${AccountCardColors.danger};
  text-align: center;
  cursor: pointer;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  :hover {
    color: ${AccountCardColors.white};
    background-color: ${AccountCardColors.danger};
  }
  :active {
    background-color: ${AccountCardColors.dangerDark};
    border: 1px solid ${AccountCardColors.dangerDark};
  }
  transition: background-color 0.3s, color 0.3s;
`;

const StyledAccountCardWrapper = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledUsernameTitle = styled.h5`
  margin: 0 0 12px;
`;
const StyledLink = styled(UILink)`
  color: ${colors.darkGray};
  margin: 3px 0;
  :hover {
    color: ${colors.primary};
    opacity: 0.8;
  }
`;

const activeLinkStyle = css`
  color: ${colors.primaryDark};
`;

const _AccountCard: React.SFC<AccountCardProps> = props => {
  const { close: closeCurrentCard } = props;
  const { user } = useApplicationContext();

  const links = [{ url: '/profile', text: 'Profil' }];
  useWindowEvent('click', props.close);

  return (
    <StyledAccountCardWrapper>
      <StyledUsernameTitle>{user.name}</StyledUsernameTitle>
      {links.map(item => (
        <StyledLink onClick={closeCurrentCard} to={item.url} key={item.url} activeClassName={activeLinkStyle}>
          {item.text}
        </StyledLink>
      ))}
      <StyledLogoutButton onClick={logout}>Cikis Yap</StyledLogoutButton>
    </StyledAccountCardWrapper>
  );
};

const AccountCard = _AccountCard;

export { AccountCard };
