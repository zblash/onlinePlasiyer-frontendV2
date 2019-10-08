import * as React from 'react';
import styled from '~/styled';

const StyledDiv = styled.div<{ color: string }>`
  color: ${props => props.color};
`;
const Home: React.SFC<IHomeProps> = props => {
  return (
    <div>
      Hello Home
      <StyledDiv color="red">yasin</StyledDiv>
    </div>
  );
};
interface IHomeProps {}

export default Home;
