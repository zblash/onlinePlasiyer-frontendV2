import * as React from 'react';
import Tooltip from 'rc-tooltip';
import { IconName } from '~/components/ui/icon';
import { UIIcon, UIButton, UILink } from '~/components/ui';
import styled, { css } from '~/styled';

/*
  MenuItem Helpers
*/
export interface MenuItemProps {
  id: string;
  iconName: IconName;
  text: string | React.ReactElement;
  link?: string;
  cardContent?: ((closeCard: () => void) => React.ReactElement) | React.ReactElement;
  callback?: () => void;
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

const cssIconStyle = css``;

const StyledMenuItemWrapper = styled(UIButton)`
  display: flex;
  padding: 0 24px;
  align-items: center;
  border-radius: 8px;
  justify-content: center;
  flex-direction: column;
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

const StyledLink = styled(UILink)`
  display: flex;
`;

const MenuItem: React.SFC<MenuItemProps> = props => {
  const [isClosed, setIsClosed] = React.useState(true);
  const closeCard = React.useCallback(() => setIsClosed(true), []);
  const triggerCard = React.useCallback(() => setIsClosed(!isClosed), [isClosed]);

  if (props.cardContent && !props.link && !props.callback) {
    return (
      <Tooltip
        overlay={
          typeof props.cardContent === 'function' ? (
            <StyledPopuCardWrapper>{props.cardContent(closeCard)}</StyledPopuCardWrapper>
          ) : props.cardContent ? (
            props.cardContent
          ) : (
            <span />
          )
        }
        placement="bottom"
        trigger="click"
        visible={!isClosed}
      >
        <StyledMenuItemWrapper onClick={triggerCard}>
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

  if (props.link && !props.callback && !props.cardContent) {
    return (
      <StyledLink to={props.link}>
        <StyledMenuItemWrapper>
          <UIIcon
            name={props.iconName}
            size={20}
            className={css.cx(cssIconStyle, cssCommonOpacity)}
            color={MenuItemColors.text}
          />
          <StyledMenuItemText className={cssCommonOpacity}>{props.text}</StyledMenuItemText>
        </StyledMenuItemWrapper>
      </StyledLink>
    );
  }

  return (
    <StyledMenuItemWrapper onClick={e => props.callback()}>
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
