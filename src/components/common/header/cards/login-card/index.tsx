import * as React from 'react';
import styled, { css } from '~/styled';
import { UIInput, UIButton, UIIcon, Loading } from '~/components/ui';
import { SuccessAnimationIcon } from './success-animation-icon';
import { mutationEndPoints } from '~/services';
import { ApplicationContext } from '~/context/application';
import Mutation from '~/cache-management/components/mutation';

/*
  LoginCard Helpers
*/
interface LoginCardProps {
  onSuccess: Function;
}

/*
  LoginCard Colors
*/
export const LoginCardColors = {
  primary: '#0075ff',
  primaryDark: '#0062d4',
  wrapperBackground: '#fff',
  unFocused: '#797979',
  danger: '#e2574c',
  dangerDark: '#e2574c',
  white: '#fff',
};

/*
  LoginCard Styles
*/

const StyledLoginCardWrapper = styled.div`
  padding: 16px;
`;

const StyledInputWrapper = styled.div<{ hasError: boolean }>`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  padding: 4px;
  border: 1px solid ${props => (props.hasError ? LoginCardColors.danger : LoginCardColors.primary)};
  border-radius: 4px;
`;
const StyledInput = styled(UIInput)`
  margin: 0 8px;
  color: ${LoginCardColors.unFocused};
`;

const StyledLoginButton = styled(UIButton)<{ hasError: boolean }>`
  border: 1px solid ${props => (props.hasError ? LoginCardColors.danger : LoginCardColors.primary)};
  background-color: ${LoginCardColors.white};
  color: ${props => (props.hasError ? LoginCardColors.danger : LoginCardColors.primary)};
  text-align: center;
  cursor: pointer;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  :hover {
    color: ${LoginCardColors.white};
    background-color: ${props => (props.hasError ? LoginCardColors.danger : LoginCardColors.primary)};
  }
  :active {
    background-color: ${props => (props.hasError ? LoginCardColors.dangerDark : LoginCardColors.primaryDark)};
  }
  transition: background-color 0.3s, color 0.3s;
`;

const StyledBottomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 24px;
`;

const dangerIconShakeAnimation = css.keyframes`
  10%, 90% {
    transform: translate(-0.5px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(1px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-2px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(2px, 0, 0);
  }
`;

const cssDangerIconStyle = css`
  animation: ${dangerIconShakeAnimation} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
`;

const LoginCard: React.SFC<LoginCardProps> = props => {
  const { userLogin } = React.useContext(ApplicationContext);

  const [hasSuccess, setHasSuccess] = React.useState(false);
  const [hasAnimation, setHasAnimation] = React.useState(false);

  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const __ = (
    <Mutation
      mutation={mutationEndPoints.login}
      variables={{ password, username }}
      onError={() => {
        setHasAnimation(true);
        setTimeout(() => {
          setHasAnimation(false);
        }, 1000);
      }}
      onComplated={() => {
        setHasSuccess(true);
        setTimeout(() => {
          props.onSuccess();
          userLogin();
        }, 1300);
      }}
    >
      {(login, { error: hasError, loading: isLoading, setError }) => {
        return (
          <StyledLoginCardWrapper>
            <StyledInputWrapper hasError={hasError}>
              <StyledInput placeholder="Kullanici Adi" onChange={e => setUsername(e.target.value)} />
            </StyledInputWrapper>
            <StyledInputWrapper hasError={hasError}>
              <StyledInput type="password" placeholder="Sifre" onChange={e => setPassword(e.target.value)} />
            </StyledInputWrapper>
            <StyledBottomWrapper>
              <StyledLoginButton
                hasError={hasError}
                onClick={() => {
                  if (!username || !password) {
                    setError(true);
                  } else {
                    login();
                  }
                }}
              >
                Giris Yap
              </StyledLoginButton>
              {isLoading && <Loading color={LoginCardColors.primary} size={24} />}
              {hasError && (
                <UIIcon
                  name="danger"
                  size={24}
                  color={LoginCardColors.danger}
                  className={css.cx({ [cssDangerIconStyle]: hasAnimation })}
                />
              )}
              {hasSuccess && <SuccessAnimationIcon />}
            </StyledBottomWrapper>
          </StyledLoginCardWrapper>
        );
      }}
    </Mutation>
  );

  return __;
};

export { LoginCard };
