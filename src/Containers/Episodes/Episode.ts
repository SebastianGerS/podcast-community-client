import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import EpisodeComponent from '../../Components/Episodes/Episode';
import {
  GetEpisodeAction, attemptGetEpisode, setEpisodeRating,
  SetEpisodeRating, GetEpisodeRatingAction, attemptGetEpisodeRating,
} from '../../Actions/Episode';
import { EpisodeState } from '../../Reducers/EpisodeReducer';
import { Episode } from '../../Models/Episode';
import { RedirectModel } from '../../Models/Redirect';
import { RedirectState } from '../../Reducers/RedirectReducer';
import { SetMessage } from '../../Actions/Message';
import { AuthState } from '../../Reducers/AuthReducer';

interface State {
  EpisodeReducer: EpisodeState;
  RedirectReducer: RedirectState;
  AuthReducer: AuthState;
}

interface StateProps {
  episode: Episode;
  isFetching: boolean;
  redirect: RedirectModel;
  avrageRating: number;
  socket: any;
}

function mapStateToProps({ EpisodeReducer, RedirectReducer, AuthReducer }: State): StateProps {
  return {
    episode: EpisodeReducer.episode,
    isFetching: EpisodeReducer.isFetching,
    redirect: RedirectReducer.redirect,
    avrageRating: EpisodeReducer.avrageRating,
    socket: AuthReducer.socket,
  };
}

interface DispatchProps {
  getEpisode: (episodeId: string) => void;
  setRating: (rating: number) => void;
  getRating: (podcastId: string, episodeId: string) => void;
}

type EpisodeComponentActions = GetEpisodeAction | SetMessage | SetEpisodeRating | GetEpisodeRatingAction;

function mapDispatchToProps(dispatch: Dispatch<EpisodeComponentActions>): DispatchProps {
  return {
    getEpisode: (episodeId: string) => attemptGetEpisode(episodeId)(dispatch),
    setRating: (rating: number) => dispatch(setEpisodeRating(rating)),
    getRating: (podcastId: string, episodeId: string) => attemptGetEpisodeRating(podcastId, episodeId)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeComponent);
