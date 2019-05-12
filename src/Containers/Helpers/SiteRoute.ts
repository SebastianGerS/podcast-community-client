import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SiteRoute from '../../Helpers/SiteRoute';
import { checkIfLogedIn, UserLogoutSuccess, IsLogedIn } from '../../Actions/Auth';
import { AuthState } from '../../Reducers/AuthReducer';
import { UnsetRedirect, unsetRedirect } from '../../Actions/Redirect';
import { RedirectState } from '../../Reducers/RedirectReducer';
import { RedirectModel } from '../../Models/Redirect';

interface State {
  AuthReducer: AuthState;
  RedirectReducer: RedirectState;
}

interface StateProps {
  isLogedIn: boolean;
  isAdmin: boolean;
  redirect: RedirectModel;
}

function mapStateToProps({
  AuthReducer, RedirectReducer,
}: State): StateProps {
  return {
    isLogedIn: AuthReducer.isLogedIn,
    isAdmin: AuthReducer.isAdmin,
    redirect: RedirectReducer.redirect,
  };
}

type SiteRouteActions = UserLogoutSuccess | IsLogedIn | UnsetRedirect;

interface DispatchProps {
  checkIfLogedIn: () => void;
  unsetRedirect: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<SiteRouteActions>): DispatchProps {
  return {
    checkIfLogedIn: () => checkIfLogedIn()(dispatch),
    unsetRedirect: () => dispatch(unsetRedirect()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteRoute);
