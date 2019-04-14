import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PodcastComponent from '../../Components/Podcasts/Podcast';
import {
  GetPodcastAction, attemptGetPodcast, resetPodcast, ResetPodcast,
} from '../../Actions/Podcast';
import { PodcastState } from '../../Reducers/PodcastReducer';
import { Podcast } from '../../Models/Podcast';
import { RedirectModel } from '../../Models/Redirect';
import { RedirectState } from '../../Reducers/RedirectReducer';
import { SetMessage } from '../../Actions/Message';
import { AuthState } from '../../Reducers/AuthReducer';
import { RatingState } from '../../Reducers/RatingReducer';
import { Rating } from '../../Models/Rating';
import {
  setRating, SetRating, resetRatings, ResetRatings,
} from '../../Actions/Rating';

interface State {
  PodcastReducer: PodcastState;
  RedirectReducer: RedirectState;
  AuthReducer: AuthState;
  RatingReducer: RatingState;
}

interface StateProps {
  podcast: Podcast;
  isFetchingPodcast: boolean;
  redirect: RedirectModel;
  socket: any;
  ratings: Rating[];
}

function mapStateToProps({
  PodcastReducer, RedirectReducer, AuthReducer, RatingReducer,
}: State): StateProps {
  return {
    podcast: PodcastReducer.podcast,
    isFetchingPodcast: PodcastReducer.isFetchingPodcast,
    redirect: RedirectReducer.redirect,
    ratings: RatingReducer.ratings,
    socket: AuthReducer.socket,
  };
}

interface DispatchProps {
  getPodcast: (podcastId: string) => void;
  resetPodcast: () => void;
  setRating: (rating: Rating) => void;
  resetRatings: () => void;
}

type PodcastComponentActions = GetPodcastAction | SetMessage | SetRating | ResetPodcast | ResetRatings;

function mapDispatchToProps(dispatch: Dispatch<PodcastComponentActions>): DispatchProps {
  return {
    getPodcast: (podcastId: string) => attemptGetPodcast(podcastId)(dispatch),
    resetPodcast: () => dispatch(resetPodcast()),
    setRating: (rating: Rating) => dispatch(setRating(rating)),
    resetRatings: () => dispatch(resetRatings()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastComponent);
