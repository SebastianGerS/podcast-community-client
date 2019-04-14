import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import MoreOptionsMenu from '../../../Components/Common/MoreOptions/MoreOptionsMenu';
import {
  toggleRecommendToUserModal, ToggleRecommendToUserModal, toggleRateEpisodeModal,
  ToggleRateEpisodeModal, toggleMoreOptionsModal, ToggleMoreOptionsModal,
} from '../../../Actions/Modal/index';
import { MoreOptionsState } from '../../../Reducers/MoreOptionsReducer';
import { Episode } from '../../../Models/Episode';
import { Podcast } from '../../../Models/Podcast';

interface State {
  MoreOptionsReducer: MoreOptionsState;
}

interface Props {
  episode?: Episode;
  podcast?: Podcast;
}

const mapStateToProps = ({ MoreOptionsReducer }: State): Props => ({
  episode: MoreOptionsReducer.episode,
  podcast: MoreOptionsReducer.podcast,
});

interface DispatchProps {
  toggleMoreOptionsModal: () => void;
  toggleRecommendToUserModal: () => void;
  toggleRateEpisodeModal: () => void;
}

type MoreOptionsMenuActions = ToggleMoreOptionsModal | ToggleRecommendToUserModal | ToggleRateEpisodeModal;

const mapDispatchToProps = (dispatch: Dispatch<MoreOptionsMenuActions>): DispatchProps => ({
  toggleMoreOptionsModal: () => dispatch(toggleMoreOptionsModal()),
  toggleRecommendToUserModal: () => dispatch(toggleRecommendToUserModal()),
  toggleRateEpisodeModal: () => dispatch(toggleRateEpisodeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreOptionsMenu);
