import * as React from 'react';
import styled from '~/styled';

interface ContainerProps {}

const ContainerWrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: auto;
`;

const StyledFullPage = styled.div`
  width: 100%;
`;

const Container: React.SFC<ContainerProps> = props => {
  return (
    <StyledFullPage>
      <ContainerWrapper>{props.children}</ContainerWrapper>
    </StyledFullPage>
  );
};

export { Container };
