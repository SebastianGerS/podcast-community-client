import { connect } from 'react-redux';
import { atemptRegister } from '../Actions/Auth';
import { atemptSetMessage } from '../Actions/Message';
import RegisterForm from '../Components/Auth/RegisterForm';

function mapStateToProps(state) {
  return {
    redirect: state.Auth.redirect,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    atemptRegister: user => dispatch(atemptRegister(user)),
    atemptSetMessage: message => dispatch(atemptSetMessage(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
