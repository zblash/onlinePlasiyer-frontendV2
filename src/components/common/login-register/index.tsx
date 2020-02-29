import * as React from 'react';
import styled, { mixins, colors, css, globalStyleCreator } from '~/styled';
import { LoginPage } from './login-page';
import { RegisterPage } from './register-page';
import logoPath from '~/assets/images/logo/flogo.png';
import { UIButton } from '~/components/ui';

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
  background-color: ${colors.primary};
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
  background-size: 256px;
  background-repeat: no-repeat;
  user-select: none;
  margin: 0 auto 16px auto;
  width: 256px;
  height: 65px;
`;

const StyledDontHaveAccountQuestion = styled.div`
  margin-top: 16px;
`;
const StyledHiglightedText = styled(UIButton)`
  background-color: transparent !important;
  color: ${colors.primary};
  float: left;
  padding: 0 !important;
  :hover {
    color: ${colors.primaryDark};
    background-color: transparent !important;
  }
`;
const floatLeft = css`
  float: left;
`;
const LoginRegisterPage: React.SFC = props => {
  const GlobalStyle = globalStyleCreator();
  const [pageType, setPageType] = React.useState<'login' | 'register'>('login');
  if (pageType === 'login') {
    return (
      <Container>
        <GlobalStyle />
        <CenteredCard>
          <StyledLogo />
          <LoginPage />
          <StyledDontHaveAccountQuestion>
            <div className={floatLeft}>{LoginPageStrings.dontHaveAccountQuestion}&nbsp;</div>
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
          <div className={floatLeft}>{LoginPageStrings.haveAccountQuestion}&nbsp;</div>
          <StyledHiglightedText onClick={() => setPageType('login')}>{LoginPageStrings.login}</StyledHiglightedText>
        </StyledDontHaveAccountQuestion>
      </CenteredCard>
    </Container>
  );
};

const _LoginRegisterPage = LoginRegisterPage;

export { _LoginRegisterPage as LoginRegisterPage };
