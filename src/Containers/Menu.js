import { connect } from 'react-redux';
import Menu from '../Components/Layout/Menu';
import { toggleMenu } from '../Actions/Modal';

function mapStateToProps(state) {
  return {
    userId: state.Auth.user._id,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () => dispatch(toggleMenu()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
