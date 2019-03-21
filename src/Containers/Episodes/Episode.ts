import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import EpisodeComponent from '../../Components/Episodes/Episode';
import { GetEpisodeAction, attemptGetEpisode } from '../../Actions/Episode';
import { EpisodeState } from '../../Reducers/EpisodeReducer';
import { Episode } from '../../Models/Episode';
import { RedirectModel } from '../../Models/Redirect';
import { RedirectState } from '../../Reducers/RedirectReducer';

interface State {
  EpisodeReducer: EpisodeState;
  RedirectReducer: RedirectState;
}

interface StateProps {
  episode: Episode;
  isFetching: boolean;
  redirect: RedirectModel;
}

function mapStateToProps({ EpisodeReducer, RedirectReducer }: State): StateProps {
  return {
    episode: EpisodeReducer.episode,
    isFetching: EpisodeReducer.isFetching,
    redirect: RedirectReducer.redirect,
  };
}

interface DispatchProps {
  getEpisode: (episodeId: string) => void;
}

type EpisodeComponentActions = GetEpisodeAction;

function mapDispatchToProps(dispatch: Dispatch<EpisodeComponentActions>): DispatchProps {
  return {
    getEpisode: (episodeId: string) => attemptGetEpisode(episodeId)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeComponent);
