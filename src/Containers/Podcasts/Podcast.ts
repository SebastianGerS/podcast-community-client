import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PodcastComponent from '../../Components/Podcasts/Podcast';
import {
  GetPodcastAction, attemptGetPodcast, SetPodcastRating,
  setPodcastRating, attemptGetPodcastRatings, GetPodcastRatingsAction, PodcastRatings,
} from '../../Actions/Podcast';
import { PodcastState } from '../../Reducers/PodcastReducer';
import { Podcast } from '../../Models/Podcast';
import { RedirectModel } from '../../Models/Redirect';
import { RedirectState } from '../../Reducers/RedirectReducer';
import { SetMessage } from '../../Actions/Message';
import { AuthState } from '../../Reducers/AuthReducer';

interface State {
  PodcastReducer: PodcastState;
  RedirectReducer: RedirectState;
  AuthReducer: AuthState;
}

interface StateProps {
  podcast: Podcast;
  isFetchingPodcast: boolean;
  redirect: RedirectModel;
  socket: any;
  avrageRating: number;
}

function mapStateToProps({ PodcastReducer, RedirectReducer, AuthReducer }: State): StateProps {
  return {
    podcast: PodcastReducer.podcast,
    isFetchingPodcast: PodcastReducer.isFetchingPodcast,
    redirect: RedirectReducer.redirect,
    avrageRating: PodcastReducer.avrageRating,
    socket: AuthReducer.socket,
  };
}

interface DispatchProps {
  getPodcast: (podcastId: string) => void;
  setRating: (rating: PodcastRatings) => void;
  getRatings: (podcastId: string) => void;
}

type PodcastComponentActions = GetPodcastAction | SetMessage | SetPodcastRating | GetPodcastRatingsAction;

function mapDispatchToProps(dispatch: Dispatch<PodcastComponentActions>): DispatchProps {
  return {
    getPodcast: (podcastId: string) => attemptGetPodcast(podcastId)(dispatch),
    setRating: (rating: PodcastRatings) => dispatch(setPodcastRating(rating)),
    getRatings: (podcastId: string) => attemptGetPodcastRatings(podcastId)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastComponent);
