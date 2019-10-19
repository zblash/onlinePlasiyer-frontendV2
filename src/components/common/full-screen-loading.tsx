import * as React from 'react';
import styled, { css } from '~/styled';
import Portal from './portal';

/*
  FullScreenLoading Helpers
*/
interface FullScreenLoadingProps {}

/*
  FullScreenLoading Colors
*/
export const FullScreenLoadingColors = {
  wrapperBackground: '#fff',
};

/*
  FullScreenLoading Styles
*/

const StyledFullScreenLoadingWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${FullScreenLoadingColors.wrapperBackground};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledRedirectingText = styled.h1`
  position: absolute;
  margin: 0;
  font-family: 'Open Sans';
  font-weight: 600;
  font-size: 36px;
  text-transform: uppercase;
  left: 46%;
  top: 58%;
`;

const StyledBodyDiv = styled.div`
  position: absolute;
  top: 50%;
  margin-left: -50px;
  left: 50%;
  animation: speeder 0.4s linear infinite;

  > span {
    height: 5px;
    width: 35px;
    background: #0075ff;
    position: absolute;
    top: -19px;
    left: 60px;
    border-radius: 2px 10px 1px 0;
  }
`;
const StyledBaseSpan = styled.span`
  position: absolute;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-right: 100px solid #0075ff;
  border-bottom: 6px solid transparent;

  &:before {
    content: '';
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background: #0075ff;
    position: absolute;
    right: -110px;
    top: -16px;
  }

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-top: 0 solid transparent;
    border-right: 55px solid #0075ff;
    border-bottom: 16px solid transparent;
    top: -16px;
    right: -98px;
  }
`;

const StyledFaceDiv = styled.div`
  position: absolute;
  height: 12px;
  width: 20px;
  background: #0075ff;
  border-radius: 20px 20px 0 0;
  transform: rotate(-40deg);
  right: -125px;
  top: -15px;

  &:after {
    content: '';
    height: 12px;
    width: 12px;
    background: #0075ff;
    right: 4px;
    top: 7px;
    position: absolute;
    transform: rotate(40deg);
    transform-origin: 50% 50%;
    border-radius: 0 0 0 2px;
  }
`;

const StyledLongFasers = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  span {
    position: absolute;
    height: 2px;
    width: 20%;
    background: #0075ff;

    &:nth-child(1) {
      top: 20%;
      animation: lf 0.6s linear infinite;
      animation-delay: -5s;
    }

    &:nth-child(2) {
      top: 40%;
      animation: lf2 0.8s linear infinite;
      animation-delay: -1s;
    }

    &:nth-child(3) {
      top: 60%;
      animation: lf3 0.6s linear infinite;
    }

    &:nth-child(4) {
      top: 80%;
      animation: lf4 0.5s linear infinite;
      animation-delay: -3s;
    }
  }
`;
const cssCommonSpanStyle = css`
  width: 30px;
  height: 1px;
  background: #0075ff;
  position: absolute;
  animation: fazer1 0.2s linear infinite;
`;

const cssAnimation2 = css`
  top: 3px;
  animation: fazer2 0.4s linear infinite;
`;

const cssAnimation3 = css`
  top: 1px;
  animation: fazer3 0.4s linear infinite;
  animation-delay: -1s;
`;

const cssAnimation4 = css`
  top: 4px;
  animation: fazer4 1s linear infinite;
  animation-delay: -1s;
`;

const FullScreenLoading: React.SFC<FullScreenLoadingProps> = props => {
  const __ = (
    <Portal>
      <StyledFullScreenLoadingWrapper>
        <StyledBodyDiv className="body">
          <span>
            <span className={css.cx(cssCommonSpanStyle)} />
            <span className={css.cx(cssCommonSpanStyle, cssAnimation2)} />
            <span className={css.cx(cssCommonSpanStyle, cssAnimation3)} />
            <span className={css.cx(cssCommonSpanStyle, cssAnimation4)} />
          </span>
          <div className="base">
            <StyledBaseSpan />
            <div className="face"></div>
            <StyledFaceDiv />
          </div>
        </StyledBodyDiv>
        <StyledLongFasers>
          <span />
          <span />
          <span />
          <span />
        </StyledLongFasers>
        <StyledRedirectingText>Yukleniyor</StyledRedirectingText>
      </StyledFullScreenLoadingWrapper>
    </Portal>
  );

  /*
  FullScreenLoading Lifecycle
  */

  /*
  FullScreenLoading Functions
  */

  return __;
};

export { FullScreenLoading };
