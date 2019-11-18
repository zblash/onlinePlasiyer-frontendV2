import * as React from 'react';
import styled from '~/styled';
import { UIInput, UIButton, Loading } from '~/components/ui';
import { login } from '~/services/api';

/*
  LoginPage Helpers
*/
interface LoginPageProps {}

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
  dontHaveAccountQuestion: 'Hesabin Yokmu ?',
  register: 'Kayit Ol',
};

/*
  LoginPage Styles
*/
const StyledInput = styled(UIInput)<{ hasError: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px;
  border: 1px solid ${props => (props.hasError ? LoginPageColors.danger : LoginPageColors.primary)};
  border-radius: 4px;
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
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!username || !password) {
          setError(true);
        } else {
          setError(false);
          setIsLoading(true);
          login(username, password).catch(() => {
            setError(true);
            setIsLoading(false);
          });
        }
      }}
    >
      <StyledInput
        placeholder="Kullanici Adi"
        onChange={e => setUsername(e)}
        id="username-login-card"
        hasError={hasError}
      />
      <StyledInput
        type="password"
        placeholder="Sifre"
        onChange={e => setPassword(e)}
        id="password-login-card"
        hasError={hasError}
      />
      <StyledBottomWrapper>
        <StyledLoginButton hasError={hasError} type="submit">
          {isLoading ? <Loading color="currentColor" size={24} /> : LoginPageStrings.login}
        </StyledLoginButton>
      </StyledBottomWrapper>
    </form>
  );
};

export { LoginPage };