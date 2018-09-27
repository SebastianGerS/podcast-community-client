import { connect } from 'react-redux';
import SiteRoute from '../Helpers/SiteRoute';
import { checkIfLogedIn } from '../Actions/Auth';
import { checkIfResized, setHeight } from '../Actions/Modal';

function mapStateToProps(state) {
  return {
    menuIsActive: state.Modal.menuIsActive,
    loginModalIsActive: state.Modal.loginModalIsActive,
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

export default connect(mapStateToProps, mapDispatchToProps)(SiteRoute);
