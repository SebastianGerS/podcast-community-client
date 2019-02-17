import React from 'react';
import PropTypes from 'prop-types';
import MessageModel from '../../Models/Message';

const Message = ({ message }) => (
  <div className={`message ${message.type}`}>
    <p>{message.text}</p>
  </div>
);

Message.propTypes = {
  message: PropTypes.shape(MessageModel).isRequired,
};

export default Message;
