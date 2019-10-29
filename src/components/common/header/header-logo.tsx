import * as React from 'react';
import styled from '~/styled';
import logoPath from '~/assets/images/logo.png';
import { UILink } from '~/components/ui';

const StyledHeaderLogoTitle = styled(UILink)`
  background-image: url(${logoPath});
  user-select: none;
  width: 256px;
  height: 100%;
`;

const HeaderLogo: React.SFC<IHeaderLogoProps> = props => {
  return <StyledHeaderLogoTitle to="/" />;
};

interface IHeaderLogoProps {}

const _HeaderLogo = React.memo(HeaderLogo);

export { _HeaderLogo as HeaderLogo };
