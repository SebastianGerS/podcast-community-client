import { connect } from 'react-redux';
import { List } from 'immutable';
import FollowsModalUser from '../../Components/Follows/FollowsModalUser';
import { UserState } from '../../Reducers/UserReducer';
import { Session } from '../../Models/Session';

interface State {
  UserReducer: UserState;
}

interface Props {
  followSessions: List<Session>;
}

const mapStateToProps = ({ UserReducer }: State): Props => ({
  followSessions: UserReducer.followSessions,
});


export default connect(mapStateToProps)(FollowsModalUser);
