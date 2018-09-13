import { connect } from 'react-redux';
import MenuBar from '../Components/Layout/MenuBar';
import { toggleMenu } from '../Actions/Modal';

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () => dispatch(toggleMenu()),
  };
}

export default connect(null, mapDispatchToProps)(MenuBar);
