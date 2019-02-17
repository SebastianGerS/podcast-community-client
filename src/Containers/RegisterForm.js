import { connect } from 'react-redux';
import { atemptRegister } from '../Actions/Auth';
import RegisterForm from '../Components/Auth/RegisterForm';

function mapStateToProps(state) {
  return {
    redirect: state.Auth.redirect,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    atemptRegister: user => dispatch(atemptRegister(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
