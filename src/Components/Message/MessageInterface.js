import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

function MessageInterface({
  message, removeMessage, showMessage, type,
}) {
  useEffect(() => {
    if (showMessage) {
      setTimeout(removeMessage, 6000);
    }
  }, [message]);

  return (showMessage ? <Message type={type} message={message} /> : null);
}

MessageInterface.propTypes = {
  showMessage: PropTypes.bool.isRequired,
  removeMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MessageInterface;
