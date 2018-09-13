import { connect } from 'react-redux';
import Menu from '../Components/Layout/Menu';
import { toggleMenu } from '../Actions/Modal';

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () => dispatch(toggleMenu()),
  };
}

export default connect(null, mapDispatchToProps)(Menu);
