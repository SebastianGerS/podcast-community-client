import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PodcastComponent from '../../Components/Podcasts/Podcast';
import { GetPodcastAction, attemptGetPodcast } from '../../Actions/Podcast';
import { PodcastState } from '../../Reducers/PodcastReducer';
import { Podcast } from '../../Models/Podcast';

interface State {
  PodcastReducer: PodcastState;
}

interface StateProps {
  podcast: Podcast;
  isFetchingPodcast: boolean;
}

function mapStateToProps({ PodcastReducer }: State): StateProps {
  return {
    podcast: PodcastReducer.podcast,
    isFetchingPodcast: PodcastReducer.isFetchingPodcast,
  };
}

interface DispatchProps {
  getPodcast: (podcastId: string) => void;
}

type PodcastComponentActions = GetPodcastAction;

function mapDispatchToProps(dispatch: Dispatch<PodcastComponentActions>): DispatchProps {
  return {
    getPodcast: (podcastId: string) => attemptGetPodcast(podcastId)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastComponent);
