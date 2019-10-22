import * as React from 'react';
import styled from '~/styled';
import logoPath from '~/assets/images/logo.png';
import { Link } from '~/components/ui';

const StyledHeaderLogoTitle = styled(Link)`
  background-image: url(${logoPath});
  user-select: none;
  width: 256px;
  height: 100%;
`;

const HeaderLogo: React.SFC<IHeaderLogoProps> = props => {
  return <StyledHeaderLogoTitle to="/" />;
};

interface IHeaderLogoProps {}

export { HeaderLogo };
