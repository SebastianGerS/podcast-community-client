import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { attemptRegister, UserRegistrationAction, UserData } from '../../Actions/Auth';
import RegisterForm from '../../Components/Auth/RegisterForm';
import { RedirectModel } from '../../Models/Redirect';
import { RedirectState } from '../../Reducers/RedirectReducer';

interface State {
  RedirectReducer: RedirectState;
}
interface StateProps {
  redirect: RedirectModel;
}

function mapStateToProps({ RedirectReducer }: State): StateProps {
  return {
    redirect: RedirectReducer.redirect,
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
