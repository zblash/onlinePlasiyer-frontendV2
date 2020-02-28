import * as React from 'react';
import styled, { globalStyleCreator } from '~/styled';

interface ContainerProps {}

const ContainerWrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: auto auto 30px auto;
`;

const StyledFullPage = styled.div`
  width: 100%;
`;

const Container: React.SFC<ContainerProps> = props => {
  const GlobalStyle = globalStyleCreator();

  return (
    <>
      <StyledFullPage>
        <GlobalStyle />
        <ContainerWrapper>{props.children}</ContainerWrapper>
      </StyledFullPage>
    </>
  );
};

export { Container };
