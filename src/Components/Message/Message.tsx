import React from 'react';
import { Message } from '../../Models/Message';

interface Props {
  message: Message;
  animation: string;
}

const MessageComponent = ({ message, animation }: Props): JSX.Element => (
  <div className={`message ${message.type} ${animation} `}>
    <p>{message.text}</p>
  </div>
);

export default MessageComponent;
