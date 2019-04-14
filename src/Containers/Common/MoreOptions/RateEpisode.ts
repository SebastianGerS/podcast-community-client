import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RateEpisode from '../../../Components/Common/MoreOptions/RateEpisode';
import {
  toggleRateEpisodeModal, ToggleRateEpisodeModal, toggleMoreOptionsModal, ToggleMoreOptionsModal,
} from '../../../Actions/Modal/index';
import { Episode } from '../../../Models/Episode';
import { MoreOptionsState } from '../../../Reducers/MoreOptionsReducer';
import { UserState } from '../../../Reducers/UserReducer';
import { attemptRateEpisode, RateEpisodeAction } from '../../../Actions/Rating';
import { SetMessage } from '../../../Actions/Message';

interface State {
  MoreOptionsReducer: MoreOptionsState;
  UserReducer: UserState;
}

interface Props {
  episode?: Episode;
}

const mapStateToProps = ({ MoreOptionsReducer }: State): Props => ({
  episode: MoreOptionsReducer.episode,
});

interface DispatchProps {
  toggleRateEpisodeModal: () => void;
  toggleMoreOptionsModal: () => void;
  rateEpisode: (podcastId: string, episodeRating: object) => void;
}

type RateEpisodeActions = ToggleRateEpisodeModal | RateEpisodeAction | SetMessage | ToggleMoreOptionsModal;

const mapDispatchToProps = (dispatch: Dispatch<RateEpisodeActions>): DispatchProps => ({
  toggleRateEpisodeModal: () => dispatch(toggleRateEpisodeModal()),
  toggleMoreOptionsModal: () => dispatch(toggleMoreOptionsModal()),
  rateEpisode: (podcastId: string, episodeRating: object) => (
    attemptRateEpisode(podcastId, episodeRating)(dispatch)
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RateEpisode);
