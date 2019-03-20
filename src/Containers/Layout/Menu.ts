import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Menu from '../../Components/Layout/Menu';
import { toggleMenu, ToggleMenu } from '../../Actions/Modal';
import { AuthState } from '../../Reducers/AuthReducer';

interface State {
  AuthReducer: AuthState;
}

interface StateProps {
  userId: string | StringConstructor;
}

function mapStateToProps({ AuthReducer }: State): StateProps {
  return {
    userId: AuthReducer.user._id,
  };
}

interface DispatchProps {
  closeMenu: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<ToggleMenu>): DispatchProps {
  return {
    closeMenu: () => dispatch(toggleMenu()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
