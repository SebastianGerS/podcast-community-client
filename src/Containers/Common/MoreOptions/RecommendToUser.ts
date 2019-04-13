import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RecommendToUser from '../../../Components/Common/MoreOptions/RecommendToUser';
import {
  toggleRecommendToUserModal, ToggleRecommendToUserModal, toggleMoreOptionsModal, ToggleMoreOptionsModal,
} from '../../../Actions/Modal/index';
import { Episode } from '../../../Models/Episode';
import { Podcast } from '../../../Models/Podcast';
import { MoreOptionsState } from '../../../Reducers/MoreOptionsReducer';
import { UserState } from '../../../Reducers/UserReducer';
import { User } from '../../../Models/User';
import { attemptRecommendToUser, CreateUserEventActions } from '../../../Actions/Event';

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
  toggleMoreOptionsModal: () => void;
  recommendToUser: (targetUserId: string, object: object) => void;
}

type RecommendToUserActions = ToggleRecommendToUserModal | CreateUserEventActions | ToggleMoreOptionsModal;

const mapDispatchToProps = (dispatch: Dispatch<RecommendToUserActions>): DispatchProps => ({
  toggleMoreOptionsModal: () => dispatch(toggleMoreOptionsModal()),
  toggleRecommendToUserModal: () => dispatch(toggleRecommendToUserModal()),
  recommendToUser: (targetUserId: string, recommenation: object) => (
    attemptRecommendToUser(targetUserId, recommenation)(dispatch)
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommendToUser);
