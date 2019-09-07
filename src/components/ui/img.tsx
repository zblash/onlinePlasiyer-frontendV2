import * as React from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
export default class Image extends React.Component<ImageProps, ImageState> {
  static defaultProps = {
    zoomable: false,
  };
  state = { modalIsOpen: false };
  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
  };
  render() {
    const { modalIsOpen } = this.state;
    const { src, zoomable, alt } = this.props;
    return (
      <div>
        <img
          src={src}
          alt={alt}
          onClick={() => {
            this.toggleModal();
          }}
        />
        {zoomable && (
          <ModalGateway>
            {modalIsOpen ? (
              <Modal onClose={this.toggleModal}>
                <Carousel views={[{ src }]} />
              </Modal>
            ) : null}
          </ModalGateway>
        )}
      </div>
    );
  }
}
type ImageState = {
  modalIsOpen: boolean;
};
type ImageProps = {
  zoomable: boolean;
  src: string;
  alt: string;
};
