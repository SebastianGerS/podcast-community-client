import { connect } from 'react-redux';
import SiteRoute from '../Helpers/Routes';
import { checkIfLogedIn } from '../Actions/Auth';

function mapStateToProps(state) {
  return {
    isLogedIn: state.Auth.isLogedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkIfLogedIn: () => dispatch(checkIfLogedIn()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteRoute);
