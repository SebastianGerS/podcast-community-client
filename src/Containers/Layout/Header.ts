import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Header from '../../Components/Layout/Header';
import {
  toggleLoginModal, ToggleLoginModal, toggleNotificationsModal, ToggleNotificationsModal,
} from '../../Actions/Modal';
import { AuthState } from '../../Reducers/AuthReducer';

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
  toggleLogin: () => void;
  toggleNotifications: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<ToggleLoginModal | ToggleNotificationsModal>): DispatchProps {
  return {
    toggleLogin: () => dispatch(toggleLoginModal()),
    toggleNotifications: () => dispatch(toggleNotificationsModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
