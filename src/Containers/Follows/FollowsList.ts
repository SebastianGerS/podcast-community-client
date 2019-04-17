import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';
import FollowsList from '../../Components/Follows/FollowsList';
import { toggleFollowsModal } from '../../Actions/Modal';
import { UserState } from '../../Reducers/UserReducer';
import { User } from '../../Models/User';

interface State {
  UserReducer: UserState;
}

interface Props {
  followers: User[];
  following: User[];
  onlineUsers: List<string>;
}

const mapStateToProps = ({ UserReducer }: State): Props => ({
  followers: UserReducer.followers,
  following: UserReducer.following,
  onlineUsers: UserReducer.onlineUsers,
});

interface DispatchProps {
  toggleFollowsModal: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  toggleFollowsModal: () => dispatch(toggleFollowsModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowsList);
