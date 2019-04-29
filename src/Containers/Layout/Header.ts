import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Header from '../../Components/Layout/Header';
import { AuthState } from '../../Reducers/AuthReducer';
import { closeAllModals, CloseAllModals } from '../../Actions/Modal';

interface State {
  AuthReducer: AuthState;
}

interface StateProps {
  isLogedIn: boolean;
}

const mapStateToProps = ({ AuthReducer }: State): StateProps => ({
  isLogedIn: AuthReducer.isLogedIn,
});

interface DispatchProps {
  closeModal: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<CloseAllModals>): DispatchProps => ({
  closeModal: () => dispatch(closeAllModals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
