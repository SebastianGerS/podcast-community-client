import { connect } from 'react-redux';
import Header from '../Components/Layout/Header';
import { toggleLoginModal } from '../Actions/Modal';

function mapStateToProps(state) {
  return {
    isLogedIn: state.Auth.isLogedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleLogin: () => dispatch(toggleLoginModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
