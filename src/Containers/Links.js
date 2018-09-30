import { connect } from 'react-redux';
import { ConnectedSiteLink, ConnectedAuthSiteLink, ConnectedAdminSiteLink } from '../Helpers/Links';
import { toggleMenu } from '../Actions/Modal';

function mapStateToProps(state) {
  return {
    isLogedIn: state.Auth.isLogedIn,
    isAdmin: state.Auth.isAdmin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () => dispatch(toggleMenu()),
  };
}
const MapLoginToProps = connect(mapStateToProps, mapDispatchToProps);
export const SiteLink = MapLoginToProps(ConnectedSiteLink);
export const AuthSiteLink = MapLoginToProps(ConnectedAuthSiteLink);
export const AdminSiteLink = MapLoginToProps(ConnectedAdminSiteLink);
