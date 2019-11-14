import * as React from 'react';
import styled, { mixins } from '~/styled';
import { LoginPage } from './login-page';
import { RegisterPage } from './register-page';
import logoPath from '~/assets/images/logo/primary.png';

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
  haveAccountQuestion: 'Hesabin Varmi ?',
  register: 'Kayit Ol',
};

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${LoginPageColors.primary};
`;

const CenteredCard = styled.div`
  padding: 70px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(21, 27, 38, 0.15);
  line-height: 1.5;
  ${mixins.mediaBreakpointDown('tablet')} {
    padding: 24px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const StyledLogo = styled.div`
  background-image: url(${logoPath});
  background-size: 200px;
  background-repeat: no-repeat;
  user-select: none;
  margin-bottom: 16px;
  width: 256px;
  height: 56px;
`;

const StyledDontHaveAccountQuestion = styled.div`
  margin-top: 16px;
`;
const StyledHiglightedText = styled.span`
  cursor: pointer;
  color: ${LoginPageColors.primary};
  :hover {
    color: ${LoginPageColors.primaryDark};
  }
`;

const LoginRegisterPage: React.SFC = props => {
  const [pageType, setPageType] = React.useState<'login' | 'register'>('login');
  if (pageType === 'login') {
    return (
      <Container>
        <CenteredCard>
          <StyledLogo />
          <LoginPage />
          <StyledDontHaveAccountQuestion>
            {LoginPageStrings.dontHaveAccountQuestion}&nbsp;
            <StyledHiglightedText onClick={() => setPageType('register')}>
              {LoginPageStrings.register}
            </StyledHiglightedText>
          </StyledDontHaveAccountQuestion>
        </CenteredCard>
      </Container>
    );
  }

  return (
    <Container>
      <CenteredCard>
        <StyledLogo />
        <RegisterPage onSignup={() => setPageType('login')} />
        <StyledDontHaveAccountQuestion>
          {LoginPageStrings.haveAccountQuestion}&nbsp;
          <StyledHiglightedText onClick={() => setPageType('login')}>{LoginPageStrings.login}</StyledHiglightedText>
        </StyledDontHaveAccountQuestion>
      </CenteredCard>
    </Container>
  );
};

const _LoginRegisterPage = LoginRegisterPage;

export { _LoginRegisterPage as LoginRegisterPage };
