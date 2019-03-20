import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import MenuBar from '../../Components/Layout/MenuBar';
import { toggleMenu, ToggleMenu } from '../../Actions/Modal';

interface DispatchProps {
  openMenu: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<ToggleMenu>): DispatchProps {
  return {
    openMenu: () => dispatch(toggleMenu()),
  };
}

export default connect(null, mapDispatchToProps)(MenuBar);
