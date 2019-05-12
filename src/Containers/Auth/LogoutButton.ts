import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import LogoutButton from '../../Components/Auth/LogoutButton';
import { attemptLogout, UserLogoutAction } from '../../Actions/Auth';
import { AuthState } from '../../Reducers/AuthReducer';
import { SetMessage } from '../../Actions/Message';
import { ToggleMenu, toggleMenu } from '../../Actions/Modal';

interface State {
  AuthReducer: AuthState;
}

interface StateProps {
  isLogedIn: boolean;
}

function mapStateToProps({ AuthReducer }: State): StateProps {
  return {
    isLogedIn: AuthReducer.isLogedIn,
  };
}

interface DispatchProps {
  attemptLogout: () => void;
  toggleMenu: () => void;
}

type LogoutButtonAction = UserLogoutAction | SetMessage | ToggleMenu | ToggleMenu;

function mapDispatchToProps(dispatch: Dispatch<LogoutButtonAction>): DispatchProps {
  return {
    attemptLogout: () => attemptLogout()(dispatch),
    toggleMenu: () => dispatch(toggleMenu()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
