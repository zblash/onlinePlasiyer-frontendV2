import * as React from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import cls from 'classnames';

export default class Image extends React.Component<ImageProps, ImageState> {
  public static defaultProps = {
    zoomable: false,
  };

  public constructor(props: ImageProps) {
    super(props);
    this.state = { modalIsOpen: false };
  }

  private toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
  };

  public render() {
    const { modalIsOpen } = this.state;
    const { src, zoomable, extraClassName, alt } = this.props;

    return (
      <div>
        <img
          className={cls(extraClassName, {
            'cursor-pointer': zoomable,
          })}
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
interface ImageState {
  modalIsOpen: boolean;
}
interface ImageProps {
  extraClassName?: string;
  zoomable: boolean;
  src: string;
  alt: string;
}
