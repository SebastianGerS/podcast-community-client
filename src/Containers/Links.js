import { connect } from 'react-redux';
import { ConnectedAuthSiteLink, ConnectedAdminSiteLink } from '../Helpers/Links';

function mapStateToProps(state) {
  return {
    isLogedIn: state.isLogedIn,
  };
}
const MapLoginToProps = connect(mapStateToProps, null);
export const AuthSiteLink = MapLoginToProps(ConnectedAuthSiteLink);
export const AdminSiteLink = MapLoginToProps(ConnectedAdminSiteLink);
