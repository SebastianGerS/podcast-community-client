import React from 'react';
import PropTypes from 'prop-types';
import { getMediumModalHeight, getSmalModalHeight } from './UserAgent';

const Modal = ({ component: Component, ...rest }) => {
  const {
    size, backgroundColor, height, ...props
  } = rest;

  const styles = {
    height: size === 'smal' ? getSmalModalHeight(height) : getMediumModalHeight(height),
  };
  return (
    <div className={`modal top ${backgroundColor ? `background-${backgroundColor}` : 'background-black'}`} style={styles}>
      <Component {...props} />
    </div>
  );
};

Modal.propTypes = {
  component: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
};
export default Modal;
