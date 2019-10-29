import * as React from 'react';
import styled from '~/styled';
import { UIButton } from '~/components/ui';
import { useApplicationContext } from '~/utils/hooks';

/*
  AccountCard Helpers
*/
interface AccountCardProps {}

/*
  AccountCard Colors
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

const _AccountCard: React.SFC<AccountCardProps> = props => {
  const { userLogout, user } = useApplicationContext();

  const __ = (
    <StyledAccountCardWrapper>
      <StyledUsernameTitle>{user.name}</StyledUsernameTitle>
      <StyledLogoutButton onClick={userLogout}>Cikis Yap</StyledLogoutButton>
    </StyledAccountCardWrapper>
  );

  /*
  AccountCard Lifecycle
  */

  /*
  AccountCard Functions
  */

  return __;
};

const AccountCard = _AccountCard;

export { AccountCard };
