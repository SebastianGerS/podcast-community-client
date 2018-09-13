import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message, type }) => (
  <div className={`message ${type}`}>
    <p>{message}</p>
  </div>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Message;
