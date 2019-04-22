import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';
import FollowsList from '../../Components/Follows/FollowsList';
import { toggleFollowsModal } from '../../Actions/Modal';
import { UserState } from '../../Reducers/UserReducer';
import { User } from '../../Models/User';
import { Session } from '../../Models/Session';

interface State {
  UserReducer: UserState;
}

interface Props {
  followers: User[];
  following: User[];
  followSessions: List<Session>;
}

const mapStateToProps = ({ UserReducer }: State): Props => ({
  followers: UserReducer.followers,
  following: UserReducer.following,
  followSessions: UserReducer.followSessions,
});

interface DispatchProps {
  toggleFollowsModal: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  toggleFollowsModal: () => dispatch(toggleFollowsModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowsList);
