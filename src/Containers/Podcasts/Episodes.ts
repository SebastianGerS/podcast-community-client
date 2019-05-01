import { connect } from 'react-redux';
import Episodes from '../../Components/Podcasts/Episodes';
import { PodcastState } from '../../Reducers/PodcastReducer';
import { Episode } from '../../Models/Episode';

interface State {
  PodcastReducer: PodcastState;
}

interface StateProps {
  episodes: Episode[];
  isFetchingEpisodes: boolean;
  isFetchingPodcast: boolean;
  nextOffset?: number;
  morePages: boolean;
}

function mapStateToProps({ PodcastReducer }: State): StateProps {
  return {
    episodes: PodcastReducer.episodes,
    isFetchingEpisodes: PodcastReducer.isFetchingEpisodes,
    isFetchingPodcast: PodcastReducer.isFetchingPodcast,
    nextOffset: PodcastReducer.nextOffset,
    morePages: PodcastReducer.morePages,
  };
}

export default connect(mapStateToProps)(Episodes);
