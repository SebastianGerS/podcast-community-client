import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import LoginForm from '../../Components/Auth/LoginForm';
import { atemptLogin, UserLoginAction, UserData } from '../../Actions/Auth';

interface DispatchProps {
  atemptLogin: (data: UserData) => void;
}

function mapDispatchToProps(dispatch: Dispatch<UserLoginAction>): DispatchProps {
  return {
    atemptLogin: (data: UserData) => atemptLogin(data)(dispatch),
  };
}

export default connect(null, mapDispatchToProps)(LoginForm);
