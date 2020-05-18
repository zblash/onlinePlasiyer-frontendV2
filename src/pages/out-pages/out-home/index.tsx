import * as React from 'react';
import styled, { colors, globalStyleCreator, mixins } from '~/styled';
import logoPath from '~/assets/images/logo/logo.png';

/* OutHomePage Helpers */
interface OutHomePageProps {}

/* OutHomePage Constants */

/* OutHomePage Styles */

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

/* OutHomePage Component  */
function OutHomePage(props: React.PropsWithChildren<OutHomePageProps>) {
  /* OutHomePage Variables */
  const GlobalStyle = globalStyleCreator();
  /* OutHomePage Callbacks */

  /* OutHomePage Lifecycle  */

  return (
    <Container>
      <GlobalStyle />
      <CenteredCard>
        <StyledLogo />
        <a href="https://onlineplasiyer-customer.herokuapp.com/">Musteri Paneli</a>
        <a href="https://onlineplasiyer-merchant.herokuapp.com/">Toptanci Paneli</a>
      </CenteredCard>
    </Container>
  );
}
const PureOutHomePage = React.memo(OutHomePage);

export { PureOutHomePage as OutHomePage };
