import * as React from 'react';
import styled from '~/styled';

const icons = {
  restart: require('~/assets/icons/restart.svg'),
  account: require('~/assets/icons/account.svg'),
  search: require('~/assets/icons/search.svg'),
  shopingBasket: require('~/assets/icons/shopping-basket.svg'),
  chevronUp: require('~/assets/icons/chevron-up.svg'),
  chevronDown: require('~/assets/icons/chevron-down.svg'),
  chevronLeft: require('~/assets/icons/chevron-left.svg'),
  chevronRight: require('~/assets/icons/chevron-right.svg'),
  downArrow: require('~/assets/icons/down-arrow.svg'),
};

export interface IconProps {
  className?: string;
  color?: string;
  name: IconName;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  size?: number;
  setRef?: React.Ref<SVGSVGElement>;
}

interface IconStyleProps {
  dangerouslySetInnerHTML: any;
  color?: string;
}

export type IconName = keyof typeof icons;

const StyledIconSvg = styled.svg<IconStyleProps>`
  display: block;
  color: ${props => props.color || ''};
`;

export const Icon = React.memo<IconProps>(props => {
  const { size, name, className } = props;
  const loadedSvg = icons[name];

  if (!loadedSvg) return null;

  const { dimensionsFromViewbox, ...attributes } = loadedSvg.attributes;

  attributes.fill = 'currentColor';

  attributes.width = size || 24;
  attributes.height = size || 24;

  const svgAttributes = {
    width: attributes.width,
    height: attributes.height,
    fill: attributes.fill,
    stroke: attributes.stroke,
    viewBox: attributes.viewBox,
  };

  return (
    <StyledIconSvg
      {...svgAttributes}
      ref={props.setRef}
      color={props.color}
      className={className}
      onClick={props.onClick}
      dangerouslySetInnerHTML={{ __html: loadedSvg.content }}
    />
  );
});
