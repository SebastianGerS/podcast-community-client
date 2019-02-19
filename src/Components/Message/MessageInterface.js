import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Message from './Message';

function MessageInterface({
  messages, removeMessage,
}) {
  const [newMessage, setNewMessage] = useState(messages.first());
  const [animation, setAnimtaion] = useState('');
  const [fadeOutTimeout, setFadeOutTimeout] = useState();

  useEffect(() => {
    if (!newMessage && messages.size > 0) {
      setNewMessage(messages.first());
      setAnimtaion('fade-in');
      setFadeOutTimeout(setTimeout(() => {
        setAnimtaion('fade-out');
        setTimeout(() => {
          setNewMessage(undefined);
          removeMessage();
        }, 300);
      }, 4000));
    } else if (messages.size > 1) {
      if (animation !== 'fade-out') {
        clearTimeout(fadeOutTimeout);
        setAnimtaion('fade-out');
        setTimeout(() => {
          setNewMessage(undefined);
          setFadeOutTimeout(undefined);
          removeMessage();
        }, 300);
      }
    }
  }, [messages]);

  return (newMessage ? <Message message={newMessage} animation={animation} /> : null);
}

MessageInterface.propTypes = {
  removeMessage: PropTypes.func.isRequired,
  messages: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default MessageInterface;
