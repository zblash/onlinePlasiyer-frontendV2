import * as React from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import cls from 'classnames';

export default class Image extends React.Component<IImageProps, IImageState> {
  public static defaultProps = {
    zoomable: false,
  };

  public constructor(props: IImageProps) {
    super(props);
    this.state = { modalIsOpen: false };
  }

  private toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
  };

  public render() {
    const { modalIsOpen } = this.state;
    const { src, zoomable, extraClassName, extraWrapperClassName, alt } = this.props;

    return (
      <div className={extraWrapperClassName}>
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
interface IImageState {
  modalIsOpen: boolean;
}
interface IImageProps {
  extraClassName?: string;
  extraWrapperClassName?: string;
  zoomable: boolean;
  src: string;
  alt: string;
}
