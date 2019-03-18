import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SiteRoute from '../Helpers/SiteRoute';
import { checkIfLogedIn, UserLogoutSuccess, IsLogedIn } from '../Actions/Auth';
import { checkIfResized, setHeight, SetHeight } from '../Actions/Modal';
import { AuthState } from '../Reducers/AuthReducer';
import { ModalState } from '../Reducers/ModalReducer';


interface State {
  AuthReducer: AuthState;
  ModalReducer: ModalState;
}

interface StateProps {
  isLogedIn: boolean;
  isAdmin: boolean;
  menuIsActive: boolean;
  loginModalIsActive: boolean;
  height: number;
}

function mapStateToProps({ AuthReducer, ModalReducer }: State): StateProps {
  return {
    isLogedIn: AuthReducer.isLogedIn,
    isAdmin: AuthReducer.isAdmin,
    menuIsActive: ModalReducer.menuIsActive,
    loginModalIsActive: ModalReducer.loginModalIsActive,
    height: ModalReducer.height,
  };
}

type SiteRouteActions = UserLogoutSuccess | IsLogedIn | SetHeight;

interface DispatchProps {
  checkIfLogedIn: () => void;
  checkIfResized: () => void;
  setHeight: (height: number) => void;
}

function mapDispatchToProps(dispatch: Dispatch<SiteRouteActions>): DispatchProps {
  return {
    checkIfLogedIn: () => checkIfLogedIn()(dispatch),
    checkIfResized: () => checkIfResized()(dispatch),
    setHeight: (height: number) => dispatch(setHeight(height)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteRoute);
