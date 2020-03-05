import * as React from 'react';
import styled from '~/styled';
import logoPath from '~/assets/images/logo/flogo.png';
import { UILink } from '~/components/ui';

const StyledHeaderLogoTitle = styled(UILink)`
  background-image: url(${logoPath});
  user-select: none;
  width: 256px;
  height: 100%;
  background-size: 190px;
  background-repeat: no-repeat;
`;

const HeaderLogo: React.SFC<IHeaderLogoProps> = props => {
  return <StyledHeaderLogoTitle to="/" />;
};

interface IHeaderLogoProps {}

const _HeaderLogo = React.memo(HeaderLogo);

export { _HeaderLogo as HeaderLogo };
