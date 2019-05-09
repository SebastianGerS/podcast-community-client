import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import MoreOptionsButton from '../../../Components/Common/MoreOptions/MoreOptionsButton';
import {
  setAndToggleMoreOptionsModal, SetAndToggleActions, toggleLoginModal, ToggleLoginModal,
} from '../../../Actions/Modal/index';
import { Podcast } from '../../../Models/Podcast';
import { Episode } from '../../../Models/Episode';
import { AuthState } from '../../../Reducers/AuthReducer';

interface State {
  AuthReducer: AuthState;
}

interface Props {
  isLogedin: boolean;
}

const mapStateToProps = ({ AuthReducer }: State): Props => ({
  isLogedin: AuthReducer.isLogedIn,
});

interface DispatchProps {
  setAndToggleMoreOptionsModal: (item: Podcast| Episode) => void;
  toggleLoginModal: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<SetAndToggleActions | ToggleLoginModal>): DispatchProps => ({
  setAndToggleMoreOptionsModal: (item: Podcast| Episode) => setAndToggleMoreOptionsModal(item)(dispatch),
  toggleLoginModal: () => dispatch(toggleLoginModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreOptionsButton);
