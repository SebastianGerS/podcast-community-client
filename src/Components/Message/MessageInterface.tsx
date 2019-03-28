import React, { useState, useEffect } from 'react';
import { List } from 'immutable';
import MessageComponent from './Message';
import { Message } from '../../Models/Message';

interface Props {
  messages: List<Message>;
  removeMessage: () => void;
}

function MessageInterface({
  messages, removeMessage,
}: Props): JSX.Element | null {
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

  return (newMessage ? <MessageComponent message={newMessage} animation={animation} /> : null);
}

export default MessageInterface;
