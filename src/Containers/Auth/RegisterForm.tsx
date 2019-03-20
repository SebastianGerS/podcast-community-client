import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { attemptRegister, UserRegistrationAction, UserData } from '../../Actions/Auth';
import RegisterForm from '../../Components/Auth/RegisterForm';
import { AuthState } from '../../Reducers/AuthReducer';
import { RedirectModel } from '../../Models/Redirect';

interface State {
  AuthReducer: AuthState;
}
interface StateProps {
  redirect: RedirectModel;
}

function mapStateToProps({ AuthReducer }: State): StateProps {
  return {
    redirect: AuthReducer.redirect,
  };
}

interface DispatchProps {
  attemptRegister: (user: UserData) => void;
}

function mapDispatchToProps(dispatch: Dispatch<UserRegistrationAction>): DispatchProps {
  return {
    attemptRegister: (user: UserData) => attemptRegister(user)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
