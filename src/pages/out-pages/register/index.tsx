import * as React from 'react';
import { useHistory } from 'react-router';
import styled, { colors, mixins, css, globalStyleCreator } from '~/styled';
import { RegisterComponent } from '~/components/common/login-register/register-component';
import logoPath from '~/assets/images/logo/logo.png';
import { UILink } from '~/components/ui';

/* RegisterCPage Helpers */
interface RegisterPageProps {}

/* RegisterCPage Constants */
const LoginPageStrings = {
  login: 'Giris Yap',
  dontHaveAccountQuestion: 'Hesabin Yokmu ?',
  haveAccountQuestion: 'Hesabin Varmi ?',
  register: 'Kayit Ol',
};
/* RegisterCPage Styles */
const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
`;

const CenteredCard = styled.div`
  padding: 30px 60px 30px 60px;
  margin: 30px 0 30px 0;
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
/* RegisterCPage Component  */
function RegisterPage(props: React.PropsWithChildren<RegisterPageProps>) {
  /* RegisterCPage Variables */
  const history = useHistory();
  const GlobalStyle = globalStyleCreator();
  /* RegisterCPage Callbacks */

  /* RegisterCPage Lifecycle  */

  return (
    <Container>
      <GlobalStyle />
      <CenteredCard>
        <StyledLogo />
        <RegisterComponent onSignup={() => history.push('/login')} />
        <StyledDontHaveAccountQuestion>
          <div className={floatLeft}>{LoginPageStrings.haveAccountQuestion}&nbsp;</div>
          <StyledHiglightedText to="/login">{LoginPageStrings.login}</StyledHiglightedText>
        </StyledDontHaveAccountQuestion>
      </CenteredCard>
    </Container>
  );
}
const PureRegisterPage = React.memo(RegisterPage);

export { PureRegisterPage as RegisterPage };
