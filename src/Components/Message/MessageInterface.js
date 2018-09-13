import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

class MessageInterface extends Component {
  componentDidUpdate(prevProps) {
    const { message, removeMessage, showMessage } = this.props;
    if (prevProps.message !== message && showMessage) {
      setTimeout(removeMessage, 6000);
    }
  }

  render() {
    const { showMessage, ...rest } = this.props;

    return (
      showMessage ? <Message {...rest} /> : null);
  }
}

MessageInterface.propTypes = {
  showMessage: PropTypes.bool.isRequired,
  removeMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MessageInterface;
