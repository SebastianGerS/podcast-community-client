import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ConnectedSiteLink, ConnectedAuthSiteLink, ConnectedAdminSiteLink } from '../../Components/Common/Links';
import { toggleMenu, ToggleMenu } from '../../Actions/Modal';
import { AuthState } from '../../Reducers/AuthReducer';

interface State {
  AuthReducer: AuthState;
}

interface StateProps {
  isLogedIn: boolean;
  isAdmin: boolean;
}

function mapStateToProps({ AuthReducer }: State): StateProps {
  return {
    isLogedIn: AuthReducer.isLogedIn,
    isAdmin: AuthReducer.isAdmin,
  };
}

interface DispatchProps {
  closeMenu: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<ToggleMenu>): DispatchProps {
  return {
    closeMenu: () => dispatch(toggleMenu()),
  };
}

const ConnectActionsAndProps = connect(mapStateToProps, mapDispatchToProps);

export const SiteLink = ConnectActionsAndProps(ConnectedSiteLink);
export const AuthSiteLink = ConnectActionsAndProps(ConnectedAuthSiteLink);
export const AdminSiteLink = ConnectActionsAndProps(ConnectedAdminSiteLink);
