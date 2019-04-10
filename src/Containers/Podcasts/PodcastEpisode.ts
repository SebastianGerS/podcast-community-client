import { connect } from 'react-redux';
import PodcastEpisode from '../../Components/Podcasts/PodcastEpisode';
import { PodcastState } from '../../Reducers/PodcastReducer';
import { Rating } from '../../Models/Rating';

interface State {
  PodcastReducer: PodcastState;
}
interface StateProps {
  episodeRatings: Rating[];
}

function mapStateToProps({ PodcastReducer }: State): StateProps {
  return {
    episodeRatings: PodcastReducer.episodeRatings,
  };
}

export default connect(mapStateToProps)(PodcastEpisode);
