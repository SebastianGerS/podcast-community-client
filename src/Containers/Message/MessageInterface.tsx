import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';
import MessageInterface from '../../Components/Message/MessageInterface';
import { atemptRemoveMessage, RemoveMessage } from '../../Actions/Message';
import { MessageState } from '../../Reducers/MessageReducer';
import { Message } from '../../Models/Message';

interface State {
  MessageReducer: MessageState;
}

interface StateProps {
  messages: List<Message>;
}

function mapStateToProps({ MessageReducer }: State): StateProps {
  return {
    messages: MessageReducer.messages,
  };
}

interface DispatchProps {
  removeMessage: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<RemoveMessage>): DispatchProps {
  return {
    removeMessage: () => atemptRemoveMessage()(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageInterface);
