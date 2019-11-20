import * as React from 'react';
import Tooltip from 'rc-tooltip';
import { IconName } from '~/components/ui/icon';
import { UIIcon, UIButton } from '~/components/ui';
import styled, { css } from '~/styled';

/*
  MenuItem Helpers
*/
export interface MenuItemProps {
  iconName: IconName;
  text: string;
  cardContent?: (closeCard: () => void) => React.ReactElement;
}

/*
  MenuItem Colors // TODO : move theme.json
*/
const MenuItemColors = {
  wrapperHoverBackground: '#212121',
  wrapperActiveBackground: '#1c1c1c',
  text: '#fff',
  popupCardWrapperBackground: '#fff',
  popupCardWrapperShadow: '#ccc',
};

/*
  MenuItem Styles
*/

const cssCommonOpacity = css`
  opacity: 0.4;
`;
const StyledMenuItemText = styled.span`
  color: ${MenuItemColors.text};
  font-size: 14px;
`;

const cssIconStyle = css`
  margin-right: 12px;
`;

const StyledMenuItemWrapper = styled(UIButton)`
  display: flex;
  padding: 0 24px;
  align-items: center;
  border-radius: 8px;
  background-color: transparent;
  :active {
    background-color: ${MenuItemColors.wrapperActiveBackground} !important;
  }
  :hover {
    .${cssCommonOpacity} {
      opacity: 0.8;
    }
    background-color: ${MenuItemColors.wrapperHoverBackground};
  }
`;

const StyledPopuCardWrapper = styled.div`
  background-color: ${MenuItemColors.popupCardWrapperBackground};
  border-radius: 8px;
  box-shadow: ${MenuItemColors.popupCardWrapperShadow} 0 4px 16px;
`;

const MenuItem: React.SFC<MenuItemProps> = props => {
  const [isClosed, setIsClosed] = React.useState(false);
  const tooltipProps = isClosed ? { visible: false } : {};

  if (props.cardContent) {
    return (
      <Tooltip
        overlay={
          typeof props.cardContent === 'function' ? (
            <StyledPopuCardWrapper>{props.cardContent(() => setIsClosed(true))}</StyledPopuCardWrapper>
          ) : (
            <span />
          )
        }
        placement="bottom"
        trigger="click"
        {...tooltipProps}
      >
        <StyledMenuItemWrapper onClick={() => setIsClosed(false)}>
          <UIIcon
            name={props.iconName}
            size={20}
            className={css.cx(cssIconStyle, cssCommonOpacity)}
            color={MenuItemColors.text}
          />
          <StyledMenuItemText className={cssCommonOpacity}>{props.text}</StyledMenuItemText>
        </StyledMenuItemWrapper>
      </Tooltip>
    );
  }

  return (
    <StyledMenuItemWrapper>
      <UIIcon
        name={props.iconName}
        size={20}
        className={css.cx(cssIconStyle, cssCommonOpacity)}
        color={MenuItemColors.text}
      />
      <StyledMenuItemText className={cssCommonOpacity}>{props.text}</StyledMenuItemText>
    </StyledMenuItemWrapper>
  );
};

export { MenuItem };
