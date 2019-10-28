import * as React from 'react';
import styled from '~/styled';
import Portal from './portal';
import { DefaultLoading } from './default-loading';

/*
  FullScreenLoading Helpers
*/
interface FullScreenLoadingProps {}

/*
  FullScreenLoading Colors
*/
const FullScreenLoadingColors = {
  wrapperBackground: '#fff',
};

/*
  FullScreenLoading Styles
*/

const StyledFullScreenLoadingWrapper = styled.div`
  background-color: ${FullScreenLoadingColors.wrapperBackground};
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

const FullScreenLoading: React.SFC<FullScreenLoadingProps> = React.memo(() => (
  <Portal>
    <StyledFullScreenLoadingWrapper>
      <DefaultLoading />
    </StyledFullScreenLoadingWrapper>
  </Portal>
));

export { FullScreenLoading };
