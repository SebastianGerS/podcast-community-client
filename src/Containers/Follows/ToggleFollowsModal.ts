import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ToggleFollowsModalComponent from '../../Components/Follows/ToggleFollowsModal';
import { AuthState } from '../../Reducers/AuthReducer';
import { toggleFollowsModal, ToggleFollowsModal } from '../../Actions/Modal';
import { UserState } from '../../Reducers/UserReducer';

interface State {
  AuthReducer: AuthState;
  UserReducer: UserState;
}

interface StateProps {
  userId: string | StringConstructor;
  followsOnline: boolean;
  follows: number;
  socket: any;
}

function mapStateToProps({ AuthReducer, UserReducer }: State): StateProps {
  return {
    userId: AuthReducer.user._id,
    followsOnline: UserReducer.followSessions.size > 0,
    follows: UserReducer.followers.length + UserReducer.following.length,
    socket: AuthReducer.socket,
  };
}

interface DispatchProps {
  toggleFollowsModal: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<ToggleFollowsModal>): DispatchProps {
  return {
    toggleFollowsModal: () => dispatch(toggleFollowsModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleFollowsModalComponent);
