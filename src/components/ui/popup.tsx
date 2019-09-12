import * as React from 'react';
import SkyLight from 'react-skylight';
import { Portal } from '~/components/common';

/*
  closeButtonStyle: PropTypes.object,
  dialogStyles: PropTypes.object,
  onCloseClicked: PropTypes.func,
  onOverlayClicked: PropTypes.func,
  overlayStyles: PropTypes.object,
  showOverlay: PropTypes.bool,
  title: PropTypes.any,
  transitionDuration: PropTypes.number,
  titleStyle: PropTypes.object,
  closeOnEsc: PropTypes.bool,
  className: PropTypes.string,
  closeButton: PropTypes.any,
  afterClose: PropTypes.func,
  afterOpen: PropTypes.func,
  beforeClose: PropTypes.func,
  beforeOpen: PropTypes.func,
  hideOnOverlayClicked: PropTypes.bool,

   */

interface SkyLightRefItems {
  show: Function;
  hide: Function;
}

export default class Popup extends React.Component<IPopupProps, PopupState> {
  public static defaultProps = {
    shouldRenderCloseIcon: true,
    hideOverlayClicked: true,
    closeOnEsc: true,
  };

  private skylight: React.RefObject<SkyLightRefItems>;

  public constructor(props: IPopupProps) {
    super(props);
    this.state = {
      isRender: props.show,
    };
    this.skylight = React.createRef<SkyLightRefItems>();
  }

  public componentDidMount() {
    this.togglePopup();
    const { isRender } = this.state;
    if (isRender) {
      this.togglePopup();
    }
  }

  public componentDidUpdate(prevProps: IPopupProps) {
    const { show } = this.props;
    if (prevProps.show !== show) {
      this.togglePopup();
    }
  }

  private openPopup = () => {
    const { isRender } = this.state;
    if (!isRender) {
      this.setState({ isRender: true }, () => {
        this.skylight.current.show();
      });
    } else {
      this.skylight.current.show();
    }
  };

  private closePopup = () => {
    this.skylight.current.hide();
  };

  private _beforeClose = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose(false);
    }
  };

  private togglePopup = () => {
    const { show } = this.props;
    if (show) {
      this.openPopup();
    } else {
      this.closePopup();
    }
  };

  public render() {
    const { children, show, shouldRenderCloseIcon, hideOverlayClicked, closeOnEsc } = this.props;
    // const { isRender } = this.state;
    const closeButtonStyle = !shouldRenderCloseIcon ? { display: 'none' } : {};

    return (
      <Portal>
        <SkyLight
          beforeClose={this._beforeClose}
          hideOnOverlayClicked={hideOverlayClicked}
          closeOnEsc={closeOnEsc}
          closeButtonStyle={closeButtonStyle}
          ref={this.skylight}
          isVisible={false}
        >
          {/* {isRender ? children : null} */}
          {show ? children : null}
        </SkyLight>
      </Portal>
    );
  }
}

interface IPopupProps {
  show: boolean;
  onClose?: (s: false) => void;
  shouldRenderCloseIcon: boolean;
  hideOverlayClicked: boolean;
  closeOnEsc: boolean;
}
interface PopupState {
  isRender: boolean;
}
