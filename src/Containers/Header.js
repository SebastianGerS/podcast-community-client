import { connect } from 'react-redux';
import Header from '../Components/Layout/Header';

function mapStateToProps(state) {
  return {
    isLogedIn: state.Auth.isLogedIn,
  };
}

export default connect(mapStateToProps)(Header);
