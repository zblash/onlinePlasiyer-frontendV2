import * as React from 'react';
import styled from '~/styled';
import { UIInput, UIButton, Loading } from '~/components/ui';
import logoPath from '~/assets/images/logo.png';
import { login } from '~/services/api';

/*
  LoginPage Helpers
*/
interface LoginPageProps {
  gotoRegisterPage: Function;
}

/*
  LoginPage Colors
*/

const LoginPageColors = {
  primary: '#0075ff',
  wrapperBackground: '#fff',
  unFocused: '#797979',
  danger: '#e2574c',
  dangerDark: '#e2574c',
  primaryDark: '#0062d4',
  white: '#fff',
};

/*
  LoginPage Strings
*/
const LoginPageStrings = {
  login: 'Giris Yap',
};

/*
  LoginPage Styles
*/
const StyledLoginWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${LoginPageColors.primary};
`;

// TODO: resim arka plandan dolayi dogru cikmiyor tamamen mavi olan bir resim ile degistir
const StyledLogo = styled.div`
  background-image: url(${logoPath});
  user-select: none;
  width: 256px;
  height: 56px;
`;

const CenteredCard = styled.div`
  padding: 70px 70px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(21, 27, 38, 0.15);
  line-height: 1.5;
`;

const StyledInputWrapper = styled.div<{ hasError: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px;
  border: 1px solid ${props => (props.hasError ? LoginPageColors.danger : LoginPageColors.primary)};
  border-radius: 4px;
`;
const StyledInput = styled(UIInput)`
  margin: 0 8px;
  color: ${LoginPageColors.unFocused};
`;

const StyledLoginButton = styled(UIButton)<{ hasError: boolean }>`
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => (props.hasError ? LoginPageColors.danger : LoginPageColors.primary)};
  background-color: ${LoginPageColors.white};
  color: ${props => (props.hasError ? LoginPageColors.danger : LoginPageColors.primary)};
  text-align: center;
  cursor: pointer;
  padding: 4px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  :hover {
    color: ${LoginPageColors.white};
    background-color: ${props => (props.hasError ? LoginPageColors.danger : LoginPageColors.primary)};
  }
  :active {
    background-color: ${props => (props.hasError ? LoginPageColors.dangerDark : LoginPageColors.primaryDark)};
  }
  transition: background-color 0.3s, color 0.3s;
`;

const StyledBottomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 24px;
`;

const LoginPage: React.SFC<LoginPageProps> = props => {
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [hasError, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <StyledLoginWrapper>
      <CenteredCard>
        <StyledLogo />
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!username || !password) {
              setError(true);
            } else {
              setError(false);
              setIsLoading(true);
              login(username, password).catch(() => setError(true));
            }
          }}
        >
          <StyledInputWrapper hasError={hasError}>
            <StyledInput placeholder="Kullanici Adi" onChange={e => setUsername(e)} id="username-login-card" />
          </StyledInputWrapper>
          <StyledInputWrapper hasError={hasError}>
            <StyledInput type="password" placeholder="Sifre" onChange={e => setPassword(e)} id="password-login-card" />
          </StyledInputWrapper>
          <StyledBottomWrapper>
            <StyledLoginButton hasError={hasError} type="submit">
              {isLoading ? <Loading color="currentColor" size={24} /> : LoginPageStrings.login}
            </StyledLoginButton>
          </StyledBottomWrapper>
        </form>
      </CenteredCard>
    </StyledLoginWrapper>
  );
};

export { LoginPage };
