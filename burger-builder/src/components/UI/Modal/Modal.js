import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { Component } from 'react';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={`${classes.Modal} ${
            this.props.show ? classes.Show : null
          }`}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
