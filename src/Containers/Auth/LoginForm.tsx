import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import LoginForm from '../../Components/Auth/LoginForm';
import { attemptLogin, UserLoginAction, UserData } from '../../Actions/Auth';

interface DispatchProps {
  attemptLogin: (data: UserData) => void;
}

function mapDispatchToProps(dispatch: Dispatch<UserLoginAction>): DispatchProps {
  return {
    attemptLogin: (data: UserData) => attemptLogin(data)(dispatch),
  };
}

export default connect(null, mapDispatchToProps)(LoginForm);
