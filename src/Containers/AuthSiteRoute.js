import { connect } from 'react-redux';
import AuthSiteRoute from '../Helpers/AuthSiteRoute';
import { checkIfLogedIn } from '../Actions/Auth';

function mapStateToProps(state) {
  return {
    isLogedIn: state.Auth.isLogedIn,
    menuIsActive: state.Modal.menuIsActive,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkIfLogedIn: () => dispatch(checkIfLogedIn()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthSiteRoute);
