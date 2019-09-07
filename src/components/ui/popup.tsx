import * as React from 'react';
import SkyLight from 'react-skylight';
import { Portal } from '~/components/common';

/*   closeButtonStyle: PropTypes.object,
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

type PopupProps = {
  show: boolean;
  onClose?: Function;
  children: JSX.Element;
  shouldRenderCloseIcon: boolean;
  hideOverlayClicked: boolean;
};
type PopupState = {
  isRender: boolean;
};

interface SkyLightRefItems {
  show: Function;
  hide: Function;
}

export default class Popup extends React.Component<PopupProps, PopupState> {
  static defaultProps = {
    shouldRenderCloseIcon: true,
    hideOverlayClicked: true,
  };
  public constructor(props: PopupProps) {
    super(props);
    this.state = {
      isRender: props.show,
    };
  }
  skylight = React.createRef<SkyLightRefItems>();
  openPopup = () => {
    const { isRender } = this.state;
    if (!isRender) {
      this.setState({ isRender: true }, () => {
        this.skylight.current.show();
      });
    } else {
      this.skylight.current.show();
    }
  };
  closePopup = () => {
    this.skylight.current.hide();
  };
  _beforeClose = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };
  togglePopup = () => {
    const { show } = this.props;
    show ? this.openPopup() : this.closePopup();
  };
  componentDidUpdate(prevProps: PopupProps) {
    const { show } = this.props;
    if (prevProps.show != show) {
      this.togglePopup();
    }
  }
  componentDidMount() {
    const { show } = this.props;
    const { isRender } = this.state;
    if (isRender) {
      show ? this.openPopup() : this.closePopup();
    }
  }
  render() {
    const { children, shouldRenderCloseIcon, hideOverlayClicked } = this.props;
    const { isRender } = this.state;
    const closeButtonStyle = !shouldRenderCloseIcon ? { display: 'none' } : {};
    return (
      <Portal>
        <SkyLight
          beforeClose={this._beforeClose}
          hideOnOverlayClicked={hideOverlayClicked}
          closeButtonStyle={closeButtonStyle}
          ref={this.skylight}
          isVisible={false}
        >
          {isRender ? children : null}
        </SkyLight>
      </Portal>
    );
  }
}
