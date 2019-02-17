import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Message from './Message';

function MessageInterface({
  messages, removeMessage,
}) {
  const [newMessage, setNewMessage] = useState(messages.first());

  useEffect(() => {
    if (!newMessage && messages.size > 0) {
      setNewMessage(messages.first());
      setTimeout(() => {
        setNewMessage(undefined);
        removeMessage();
      }, 6000);
    }
  }, [messages]);

  return (newMessage ? <Message message={newMessage} /> : null);
}

MessageInterface.propTypes = {
  removeMessage: PropTypes.func.isRequired,
  messages: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default MessageInterface;
