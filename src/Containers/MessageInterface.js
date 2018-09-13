import { connect } from 'react-redux';
import MessageInterface from '../Components/Message/MessageInterface';
import { atemptRemoveMessage } from '../Actions/Message';

function mapStateToProps(state) {
  return {
    showMessage: state.Message.showMessage,
    message: state.Message.message,
    type: state.Message.type,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    removeMessage: () => dispatch(atemptRemoveMessage()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageInterface);
