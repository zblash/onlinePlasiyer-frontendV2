import * as React from 'react';
import styled, { colors } from '~/styled';

/* FooterComponent Helpers */
interface FooterProps {}

/* FooterComponent Constants */

/* FooterComponent Styles */
const StyledFooterWrapper = styled.div`
  background-color: ${colors.lightGray};
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  bottom: 0;
  z-index: 100;
`;
const StyledContent = styled.div`
  min-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
/* FooterComponent Component  */
function Footer(props: React.PropsWithChildren<FooterProps>) {
  /* FooterComponent Variables */
  /* FooterComponent Callbacks */

  /* FooterComponent Lifecycle  */

  return (
    <StyledFooterWrapper>
      <StyledContent />
      <StyledContent>OnlinePlasiyer.com © 2019 - Tüm hakları saklıdır.</StyledContent>
      <StyledContent />
    </StyledFooterWrapper>
  );
}
const PureFooter = React.memo(Footer);

export { PureFooter as Footer };
