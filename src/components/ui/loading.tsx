import * as React from 'react';
import styled, { StylableProps, css } from '~/styled';

interface ILoadingProps extends StylableProps {
  color?: string;
  size?: number;
}

const LOADING_DEFAULT_COLOR = 'currentColor';

const ldsRollerKeyframes = css.keyframes`
  0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const LdsRoller = styled.div<{ color: string; size: number }>`
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
    border-color: ${props => props.color} transparent;
    animation: ${ldsRollerKeyframes} 1.2s linear infinite;
  }
`;
const Loading: React.SFC<ILoadingProps> = props => {
  return <LdsRoller color={props.color || LOADING_DEFAULT_COLOR} size={props.size || 20} className={props.className} />;
};

export { Loading };
