import { connect } from 'react-redux';
import LoginForm from '../Components/LoginForm';
import { atemptLogin } from '../Actions/Auth';

function mapDispatchToProps(dispatch) {
  return {
    atemptLogin: data => dispatch(atemptLogin(data)),
  };
}

export default connect(null, mapDispatchToProps)(LoginForm);
