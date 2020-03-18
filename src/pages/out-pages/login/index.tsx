import * as React from 'react';
import styled, { colors, mixins, css, globalStyleCreator } from '~/styled';
import logoPath from '~/assets/images/logo/logo.png';
import { UILink } from '~/components/ui';
import { LoginComponent } from '~/components/common/login-register/login-component';

/* LoginPage Helpers */
interface LoginPageProps {}

/* LoginPage Constants */
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
  height: 130px;
`;

const StyledDontHaveAccountQuestion = styled.div`
  margin-top: 16px;
`;
const StyledHiglightedText = styled(UILink)`
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
/* LoginPage Component  */
function LoginPage(props: React.PropsWithChildren<LoginPageProps>) {
  /* LoginPage Variables */
  const GlobalStyle = globalStyleCreator();
  /* LoginPage Callbacks */

  /* LoginPage Lifecycle  */

  return (
    <Container>
      <GlobalStyle />
      <CenteredCard>
        <StyledLogo />
        <LoginComponent />

        <StyledDontHaveAccountQuestion>
          <div className={floatLeft}>{LoginPageStrings.dontHaveAccountQuestion}&nbsp;</div>
          <StyledHiglightedText to="/register">{LoginPageStrings.register}</StyledHiglightedText>
        </StyledDontHaveAccountQuestion>
        <StyledDontHaveAccountQuestion>
          <div className={floatLeft}>Sifrenizi mi unuttunuz?&nbsp;</div>
          <StyledHiglightedText to="/register">Sifre sifirla</StyledHiglightedText>
        </StyledDontHaveAccountQuestion>
      </CenteredCard>
    </Container>
  );
}
const PureLoginPage = React.memo(LoginPage);

export { PureLoginPage as LoginPage };
