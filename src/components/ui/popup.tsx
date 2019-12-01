import * as React from 'react';
import styled, { css } from '~/styled';
import { Portal } from '../common/portal';
import { useStateFromProp } from '~/utils/hooks';
import { UIIcon } from './icon';

interface PopupProps {
  isShown: boolean;
  onClose: () => void;
  shouldShowCloseIcon?: boolean;
  hideOnOverlayClicked?: boolean;
}

/*
  Popup Colors // TODO : move theme.json
*/
export const PopupColors = {
  wrapperBackground: 'transparent',
  overlayBackground: 'rgba(0, 0, 0, 0.3)',
};

/*
  Popup Styles
*/

const StyledPopupOverlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: ${PopupColors.overlayBackground};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPopup = styled.div`
  background-color: ${PopupColors.wrapperBackground};
  z-index: 100;
  position: relative;
`;

const iconStyle = css`
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
`;

const PopupDefaultProps = {
  hideOnOverlayClicked: true,
  shouldShowCloseIcon: true,
};

const _Popup: React.SFC<PopupProps> = props => {
  const [isShown, setIsShown] = useStateFromProp(props.isShown);
  const { children, hideOnOverlayClicked, onClose, shouldShowCloseIcon } = { ...PopupDefaultProps, ...props };
  const __ = (
    <Portal>
      <StyledPopupOverlay
        onClick={
          hideOnOverlayClicked &&
          (() => {
            closePopup();
          })
        }
      >
        <StyledPopup
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {shouldShowCloseIcon && <UIIcon name="close" size={12} className={iconStyle} onClick={closePopup} />}
          {children}
        </StyledPopup>
      </StyledPopupOverlay>
    </Portal>
  );

  /*
  Popup Lifecycle
  */

  /*
  Popup Functions
  */

  function closePopup() {
    setIsShown(false);
    onClose();
  }

  return <Portal>{isShown ? __ : null}</Portal>;
};

const Popup: React.SFC<PopupProps> = _Popup;

export { Popup };
