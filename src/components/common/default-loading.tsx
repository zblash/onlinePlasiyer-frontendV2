import * as React from 'react';
import styled from '~/styled';
import { Loading } from '../ui';

/*
  DefaultLoading Helpers
*/
interface DefaultLoadingProps {}

/*
  DefaultLoading Colors
*/
export const DefaultLoadingColors = {
  wrapperBackground: 'transparent',
  primary: '#0075ff',
};

/*
  DefaultLoading Styles
*/

const StyledDefaultLoadingWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: ${DefaultLoadingColors.wrapperBackground};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DefaultLoading: React.SFC<DefaultLoadingProps> = () => (
  <StyledDefaultLoadingWrapper>
    <Loading size={70} color={DefaultLoadingColors.primary} />
  </StyledDefaultLoadingWrapper>
);

export { DefaultLoading };
