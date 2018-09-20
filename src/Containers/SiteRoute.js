import { connect } from 'react-redux';
import SiteRoute from '../Helpers/SiteRoute';

function mapStateToProps(state) {
  return {
    menuIsActive: state.Modal.menuIsActive,
    loginModalIsActive: state.Modal.loginModalIsActive,
  };
}

export default connect(mapStateToProps)(SiteRoute);
