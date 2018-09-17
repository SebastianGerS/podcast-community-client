import { connect } from 'react-redux';
import { atemptSetMessage } from '../Actions/Message';
import ErrorBoundray from '../Helpers/ErrorBoundary';

function mapDispatchToProps(dispatch) {
  return {
    setMessage: data => dispatch(atemptSetMessage(data)),
  };
}

export default connect(null, mapDispatchToProps)(ErrorBoundray);
