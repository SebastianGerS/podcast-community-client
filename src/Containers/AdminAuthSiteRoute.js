import { connect } from 'react-redux';
import AdminAuthSiteRoute from '../Helpers/AdminAuthSiteRoute';
import { checkIfLogedIn } from '../Actions/Auth';
import { checkIfResized, setHeight } from '../Actions/Modal';

function mapStateToProps(state) {
  return {
    isLogedIn: state.Auth.isLogedIn,
    isAdmin: state.Auth.isAdmin,
    menuIsActive: state.Modal.menuIsActive,
    height: state.Modal.height,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkIfLogedIn: () => dispatch(checkIfLogedIn()),
    checkIfResized: () => dispatch(checkIfResized()),
    setHeight: height => dispatch(setHeight(height)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAuthSiteRoute);
