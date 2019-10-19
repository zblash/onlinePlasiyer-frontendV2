import * as React from 'react';
import { css } from '~/styled';

/*
  SuccessAnimationIcon Helpers
*/
interface SuccessAnimationIconProps {
  size?: number;
}

/*
  SuccessAnimationIcon Colors
*/
export const SuccessAnimationIconColors = {
  wrapperBackground: '#fff',
};

/*
  SuccessAnimationIcon Styles
*/

const size = 24;
const color = '#0075ff';

css.global`
  .success_animation_icon__circle {
    stroke-dasharray: 216; /* ORIGINALLY 166px */
    stroke-dashoffset: 216; /* ORIGINALLY 166px */
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: ${color};
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }

  .success_animation_icon {
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #fff;
    stroke-miterlimit: 10;
    margin: 0;
    box-shadow: inset 0px 0px 0px ${color};
    animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.85s both;
  }

  .success_animation_icon__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 98; /* ORIGINALLY 48px */
    stroke-dashoffset: 98; /* ORIGINALLY 48px*/
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
  @keyframes scale {
    0%,
    100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }
  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 80px ${color};
    }
  }
`;

const SuccessAnimationIcon: React.SFC<SuccessAnimationIconProps> = props => {
  const __ = (
    <svg className="success_animation_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle className="success_animation_icon__circle" cx="26" cy="26" r="25" fill="none" />
      <path className="success_animation_icon__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </svg>
  );

  /*
  SuccessAnimationIcon Lifecycle
  */

  /*
  SuccessAnimationIcon Functions
  */

  return __;
};

export { SuccessAnimationIcon };
