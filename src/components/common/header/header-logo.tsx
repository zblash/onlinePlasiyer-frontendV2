import * as React from 'react';
import styled from '~/styled';
import logoPath from '~/assets/images/logo.png';

const HeaderLogoTitle = styled.div`
  background-image: url(${logoPath});
  user-select: none;
  width: 256px;
  height: 100%;
`;

const HeaderLogo: React.SFC<IHeaderLogoProps> = props => {
  return <HeaderLogoTitle />;
};

interface IHeaderLogoProps {}

export { HeaderLogo };
