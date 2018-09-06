import { connect } from 'react-redux';
import SiteRoute from '../Helpers/Routes';

function mapStateToProps(state) {
  return {
    isLogedIn: state.Auth.isLogedIn,
  };
}

export default connect(mapStateToProps)(SiteRoute);
