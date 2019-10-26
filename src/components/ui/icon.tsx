import * as React from 'react';
import styled from '~/styled';
import { Loading } from './loading';

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
  login: require('~/assets/icons/login.svg'),
  danger: require('~/assets/icons/danger.svg'),
  addCircle: require('~/assets/icons/addCircle.svg'),
  add: require('~/assets/icons/add.svg'),
  maintenance: require('~/assets/icons/maintenance.svg'),
  database: require('~/assets/icons/database.svg'),
  nameTag: require('~/assets/icons/nameTag.svg'),
  photoCamera: require('~/assets/icons/photoCamera.svg'),
  trash: require('~/assets/icons/trash.svg'),
  close: require('~/assets/icons/close.svg'),
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

export type IconName = keyof typeof icons | 'loading';

const StyledIconSvg = styled.svg<IconStyleProps>`
  display: block;
  color: ${props => props.color || ''};
`;

export const UIIcon = React.memo<IconProps>(props => {
  const { size, name, className, color, setRef } = props;
  if (name === 'loading') {
    return <Loading size={size} color={color} className={className} />;
  }
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
      ref={setRef}
      color={color}
      className={className}
      onClick={props.onClick}
      dangerouslySetInnerHTML={{ __html: loadedSvg.content }}
    />
  );
});
