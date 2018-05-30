import React from 'react';
import { createPortal } from 'react-dom';

type ModalPropsTypes = {
  modalRoot: React.Node,
  className?: string,
  children: React.Node
};

class Modal extends React.Component<ModalPropsTypes, {}> {
  constructor(props: ModalPropsTypes) {
    super(props);
    this.el = document.createElement('div');
    if (props.className !== undefined) {
      this.el.classList = props.className;
    }
  }

  componentDidMount() {
    this.props.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.props.modalRoot.removeChild(this.el);
  }

  render() {
    return createPortal(this.props.children, this.el);
  }
}

export default Modal;
