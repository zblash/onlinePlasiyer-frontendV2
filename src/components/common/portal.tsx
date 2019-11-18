import * as React from 'react';
import * as ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');
interface ModalProps {
  wrapperClassName?: string;
}

export default class Portal extends React.Component<ModalProps> {
  el: HTMLDivElement;

  constructor(props: ModalProps) {
    super(props);
    this.el = document.createElement('div');
    if (props.wrapperClassName) {
      this.el.className = props.wrapperClassName;
    }
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    const { children } = this.props;

    return ReactDOM.createPortal(children, this.el);
  }
}

export { Portal };
