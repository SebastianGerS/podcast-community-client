import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PodcastComponent from '../../Components/Podcasts/Podcast';
import { GetPodcastAction, attemptGetPodcast } from '../../Actions/Podcast';
import { PodcastState } from '../../Reducers/PodcastReducer';
import { Podcast } from '../../Models/Podcast';
import { RedirectModel } from '../../Models/Redirect';
import { RedirectState } from '../../Reducers/RedirectReducer';
import { SetMessage } from '../../Actions/Message';

interface State {
  PodcastReducer: PodcastState;
  RedirectReducer: RedirectState;
}

interface StateProps {
  podcast: Podcast;
  isFetchingPodcast: boolean;
  redirect: RedirectModel;
}

function mapStateToProps({ PodcastReducer, RedirectReducer }: State): StateProps {
  return {
    podcast: PodcastReducer.podcast,
    isFetchingPodcast: PodcastReducer.isFetchingPodcast,
    redirect: RedirectReducer.redirect,
  };
}

interface DispatchProps {
  getPodcast: (podcastId: string) => void;
}

type PodcastComponentActions = GetPodcastAction | SetMessage;

function mapDispatchToProps(dispatch: Dispatch<PodcastComponentActions>): DispatchProps {
  return {
    getPodcast: (podcastId: string) => attemptGetPodcast(podcastId)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastComponent);
