import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Follows from '../../Components/Follows/Follows';
import { AuthState } from '../../Reducers/AuthReducer';
import { User } from '../../Models/User';
import { UserState } from '../../Reducers/UserReducer';
import { attemptGetFollows, GetFollowsAction } from '../../Actions/User';
import { SetMessage } from '../../Actions/Message';

interface State {
  AuthReducer: AuthState;
  UserReducer: UserState;
}

interface StateProps {
  user: User;
  followers: User[];
  following: User[];
  requests: User[];
}

const mapStateToProps = ({ AuthReducer, UserReducer }: State): StateProps => ({
  user: AuthReducer.user,
  followers: UserReducer.followers,
  following: UserReducer.following,
  requests: UserReducer.requests,
});


interface DispatchState {
  getFollows: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<GetFollowsAction | SetMessage>): DispatchState => ({
  getFollows: () => attemptGetFollows()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Follows);
