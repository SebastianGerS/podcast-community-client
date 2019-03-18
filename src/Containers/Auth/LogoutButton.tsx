import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import LogoutButton from '../../Components/Auth/LogoutButton';
import { atemptLogout, UserLogoutAction } from '../../Actions/Auth';
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
  atemptLogout: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<UserLogoutAction>): DispatchProps {
  return {
    atemptLogout: () => atemptLogout()(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
