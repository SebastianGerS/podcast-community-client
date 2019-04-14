import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import EpisodeComponent from '../../Components/Episodes/Episode';
import {
  GetEpisodeAction, attemptGetEpisode, resetEpisode, ResetEpisode,
} from '../../Actions/Episode';
import { EpisodeState } from '../../Reducers/EpisodeReducer';
import { Episode } from '../../Models/Episode';
import { RedirectModel } from '../../Models/Redirect';
import { RedirectState } from '../../Reducers/RedirectReducer';
import { SetMessage } from '../../Actions/Message';
import { AuthState } from '../../Reducers/AuthReducer';
import {
  SetRating, setRating, resetRatings, ResetRatings,
} from '../../Actions/Rating';
import { Rating } from '../../Models/Rating';
import { RatingState } from '../../Reducers/RatingReducer';

interface State {
  EpisodeReducer: EpisodeState;
  RedirectReducer: RedirectState;
  AuthReducer: AuthState;
  RatingReducer: RatingState;
}

interface StateProps {
  episode: Episode;
  isFetching: boolean;
  redirect: RedirectModel;
  ratings: Rating[];
  socket: any;
}

function mapStateToProps({
  EpisodeReducer, RedirectReducer, AuthReducer, RatingReducer,
}: State): StateProps {
  return {
    episode: EpisodeReducer.episode,
    isFetching: EpisodeReducer.isFetching,
    redirect: RedirectReducer.redirect,
    ratings: RatingReducer.ratings,
    socket: AuthReducer.socket,
  };
}

interface DispatchProps {
  getEpisode: (episodeId: string) => void;
  resetEpisode: () => void;
  setRating: (rating: Rating) => void;
  resetRatings: () => void;
}

type EpisodeComponentActions = GetEpisodeAction | SetMessage | SetRating | ResetEpisode | ResetRatings;

function mapDispatchToProps(dispatch: Dispatch<EpisodeComponentActions>): DispatchProps {
  return {
    getEpisode: (episodeId: string) => attemptGetEpisode(episodeId)(dispatch),
    resetEpisode: () => dispatch(resetEpisode()),
    setRating: (rating: Rating) => dispatch(setRating(rating)),
    resetRatings: () => dispatch(resetRatings()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeComponent);
