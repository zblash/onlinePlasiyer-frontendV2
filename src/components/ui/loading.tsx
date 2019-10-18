import * as React from 'react';
import styled, { keyframes, StylableProps } from '~/styled';

interface ILoadingProps extends StylableProps {
  color?: string;
  size?: number;
  isVisible?: boolean;
}

const LoadinDefaultColor = '#000';

const ldsRollerKeyframes = keyframes`
  0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const LdsRoller = styled.div<{ color: string; size: number; isVisible: boolean }>`
  display: inline-block;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  &:after {
    content: ' ';
    display: block;
    width: ${props => props.size * 0.71875}px;
    height: ${props => props.size * 0.71875}px;
    margin: 1px;
    border-radius: 50%;
    border: ${props => props.size * 0.078125}px solid ${props => props.color};
    border-color: ${props => (props.isVisible ? props.color : 'transparent')} transparent
      ${props => (props.isVisible ? props.color : 'transparent')} transparent;
    animation: ${ldsRollerKeyframes} 1.2s linear infinite;
  }
`;

const Loading: React.SFC<ILoadingProps> = props => {
  const isVisible = props.isVisible === undefined ? true : props.isVisible;

  return (
    <LdsRoller
      color={props.color || LoadinDefaultColor}
      size={props.size || 20}
      {...{ isVisible }}
      className={props.className}
    />
  );
};

export { Loading };
