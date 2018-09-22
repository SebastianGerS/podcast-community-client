import { connect } from 'react-redux';
import LoginForm from '../Components/Auth/LoginForm';
import { atemptLogin } from '../Actions/Auth';
import { atemptSetMessage } from '../Actions/Message';

function mapDispatchToProps(dispatch) {
  return {
    atemptLogin: data => dispatch(atemptLogin(data)),
    atemptSetMessage: data => dispatch(atemptSetMessage(data)),
  };
}

export default connect(null, mapDispatchToProps)(LoginForm);
