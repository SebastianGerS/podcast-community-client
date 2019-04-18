import { connect } from 'react-redux';
import Follows from '../../Components/Follows/Follows';
import { User } from '../../Models/User';
import { UserState } from '../../Reducers/UserReducer';

interface State {
  UserReducer: UserState;
}

interface StateProps {
  followers: User[];
  following: User[];
  requests: User[];
}

const mapStateToProps = ({ UserReducer }: State): StateProps => ({
  followers: UserReducer.followers,
  following: UserReducer.following,
  requests: UserReducer.requests,
});

export default connect(mapStateToProps)(Follows);
