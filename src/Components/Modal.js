import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ component: Component, ...rest }) => {
  const { size, backgroundColor } = rest;

  return (
    <div className={`modal top ${size || 'smal'} ${backgroundColor ? `background-${backgroundColor}` : 'background-black'}`}>
      <Component />
    </div>
  );
};

Modal.propTypes = {
  component: PropTypes.func.isRequired,
};
export default Modal;
