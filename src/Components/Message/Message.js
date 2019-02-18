import React from 'react';
import PropTypes from 'prop-types';
import MessageModel from '../../Models/Message';

const Message = ({ message, animation }) => (
  <div className={`message ${message.type} ${animation} `}>
    <p>{message.text}</p>
  </div>
);

Message.propTypes = {
  message: PropTypes.shape(MessageModel).isRequired,
  animation: PropTypes.string.isRequired,
};

export default Message;
