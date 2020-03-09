import * as React from 'react';
import styled, { colors } from '~/styled';
import { UIInput, UIButton, Loading } from '~/components/ui';
import { login } from '~/services/api';
import { IExceptionResponse } from '~/services/helpers/backend-models';

/*
  LoginComponent Helpers
*/
interface LoginComponentProps {}

/*
  LoginComponent Colors // TODO : move theme.json
*/

const LoginComponentColors = {
  primary: '#0075ff',
  wrapperBackground: '#fff',
  unFocused: '#797979',
  danger: '#e2574c',
  dangerDark: '#e2574c',
  primaryDark: '#0062d4',
  white: '#fff',
};

/*
  LoginComponent Strings
*/
const LoginComponentStrings = {
  login: 'Giris Yap',
  dontHaveAccountQuestion: 'Hesabin Yokmu ?',
  register: 'Kayit Ol',
};

/*
  LoginComponent Styles
*/
const StyledInput = styled(UIInput)<{ hasError: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px;
  border: 1px solid ${props => (props.hasError ? colors.danger : colors.primary)};
  border-radius: 4px;
  color: ${LoginComponentColors.unFocused};
`;
const StyledLoginButton = styled(UIButton)<{ hasError: boolean }>`
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => (props.hasError ? colors.danger : colors.primary)};
  background-color: ${LoginComponentColors.white};
  color: ${props => (props.hasError ? colors.danger : colors.primary)};
  text-align: center;
  cursor: pointer;
  padding: 4px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  :hover {
    color: ${colors.white};
    background-color: ${props => (props.hasError ? colors.danger : colors.primary)};
  }
  :active {
    background-color: ${props => (props.hasError ? colors.dangerDark : colors.primaryDark)};
  }
  transition: background-color 0.3s, color 0.3s;
`;

const StyledBottomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 24px;
`;
const StyledErrorSpan = styled.p`
  color: ${colors.danger};
`;

const LoginComponent: React.SFC<LoginComponentProps> = props => {
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [hasError, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorDetail, setErrorDetail] = React.useState<IExceptionResponse>();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!username || !password) {
          setError(true);
        } else {
          setError(false);
          setIsLoading(true);
          login(username, password).catch(error => {
            setErrorDetail(error.response.data);
            setError(true);
            setIsLoading(false);
          });
        }
      }}
    >
      {errorDetail && (
        <>
          <StyledErrorSpan>{errorDetail.message}</StyledErrorSpan>
          {errorDetail.subErrors &&
            errorDetail.subErrors.map(subError => <StyledErrorSpan>{subError.message}</StyledErrorSpan>)}
        </>
      )}
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
          {isLoading ? <Loading color="currentColor" size={24} /> : LoginComponentStrings.login}
        </StyledLoginButton>
      </StyledBottomWrapper>
    </form>
  );
};

export { LoginComponent };
