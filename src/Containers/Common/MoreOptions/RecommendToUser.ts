import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RecommendToUser from '../../../Components/Common/MoreOptions/RecommendToUser';
import { toggleRecommendToUserModal, ToggleRecommendToUserModal } from '../../../Actions/Modal/index';
import { Episode } from '../../../Models/Episode';
import { Podcast } from '../../../Models/Podcast';
import { MoreOptionsState } from '../../../Reducers/MoreOptionsReducer';
import { UserState } from '../../../Reducers/UserReducer';
import { User } from '../../../Models/User';
import { attemptRecommendToUser, CreateUserEventActions } from '../../../Actions/Event';
import { EventItem } from '../../../Models/EventItem';

interface State {
  MoreOptionsReducer: MoreOptionsState;
  UserReducer: UserState;
}

interface Props {
  episode?: Episode;
  podcast?: Podcast;
  followers: User[];
}

const mapStateToProps = ({ MoreOptionsReducer, UserReducer }: State): Props => ({
  episode: MoreOptionsReducer.episode,
  podcast: MoreOptionsReducer.podcast,
  followers: UserReducer.followers,
});

interface DispatchProps {
  toggleRecommendToUserModal: () => void;
  recommendToUser: (targetUserId: string, object: object) => void;
}

type RecommendToUserActions = ToggleRecommendToUserModal | CreateUserEventActions;

const mapDispatchToProps = (dispatch: Dispatch<RecommendToUserActions>): DispatchProps => ({
  toggleRecommendToUserModal: () => dispatch(toggleRecommendToUserModal()),
  recommendToUser: (targetUserId: string, recommenation: EventItem) => (
    attemptRecommendToUser(targetUserId, recommenation)(dispatch)
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommendToUser);
