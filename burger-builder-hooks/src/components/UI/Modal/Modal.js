import React from 'react';

import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const Modal = (props) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     nextProps.show !== props.show ||
  //     nextProps.children !== props.children
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }}

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div className={`${classes.Modal} ${props.show ? classes.Show : null}`}>
        {props.children}
      </div>
    </Aux>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show && nextProps.children === prevProps.children
);
