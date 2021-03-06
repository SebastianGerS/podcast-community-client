import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PodcastComponent from '../../Components/Podcasts/Podcast';
import {
  GetPodcastAction, attemptGetPodcast, resetPodcast, ResetPodcast,
} from '../../Actions/Podcast';
import { PodcastState } from '../../Reducers/PodcastReducer';
import { Podcast } from '../../Models/Podcast';
import { SetMessage } from '../../Actions/Message';
import { AuthState } from '../../Reducers/AuthReducer';
import { RatingState } from '../../Reducers/RatingReducer';
import { Rating } from '../../Models/Rating';
import {
  setRating, SetRating, resetRatings, ResetRatings,
} from '../../Actions/Rating';

interface State {
  PodcastReducer: PodcastState;
  AuthReducer: AuthState;
  RatingReducer: RatingState;
}

interface StateProps {
  podcast: Podcast;
  isFetchingPodcast: boolean;
  socket: any;
  ratings: Rating[];
}

function mapStateToProps({
  PodcastReducer, AuthReducer, RatingReducer,
}: State): StateProps {
  return {
    podcast: PodcastReducer.podcast,
    isFetchingPodcast: PodcastReducer.isFetchingPodcast,
    ratings: RatingReducer.ratings,
    socket: AuthReducer.socket,
  };
}

interface DispatchProps {
  getPodcast: (podcastId: string, nextOffset?: number) => void;
  resetPodcast: () => void;
  setRating: (rating: Rating) => void;
  resetRatings: () => void;
}

type PodcastComponentActions = GetPodcastAction | SetMessage | SetRating | ResetPodcast | ResetRatings;

function mapDispatchToProps(dispatch: Dispatch<PodcastComponentActions>): DispatchProps {
  return {
    getPodcast: (podcastId: string, nextOffset?: number) => attemptGetPodcast(podcastId, nextOffset)(dispatch),
    resetPodcast: () => dispatch(resetPodcast()),
    setRating: (rating: Rating) => dispatch(setRating(rating)),
    resetRatings: () => dispatch(resetRatings()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastComponent);
