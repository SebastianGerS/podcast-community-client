import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import LoginForm from '../../Components/Auth/LoginForm';
import { attemptLogin, UserLoginAction, UserData } from '../../Actions/Auth';
import { SetMessage } from '../../Actions/Message';
import { ToggleLoginModal, toggleLoginModal } from '../../Actions/Modal';
import { AddNotificationActions } from '../../Actions/Notifications';

interface DispatchProps {
  attemptLogin: (data: UserData) => void;
  closeLoginModal: () => void;
}

type LoginFormActions = UserLoginAction | SetMessage | ToggleLoginModal | AddNotificationActions;

function mapDispatchToProps(dispatch: Dispatch<LoginFormActions>): DispatchProps {
  return {
    attemptLogin: (data: UserData) => attemptLogin(data)(dispatch),
    closeLoginModal: () => dispatch(toggleLoginModal()),
  };
}

export default connect(null, mapDispatchToProps)(LoginForm);
