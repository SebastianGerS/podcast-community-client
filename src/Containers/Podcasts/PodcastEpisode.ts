import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PodcastEpisode from '../../Components/Podcasts/PodcastEpisode';
import { Rating } from '../../Models/Rating';
import { RatingState } from '../../Reducers/RatingReducer';
import { AuthState } from '../../Reducers/AuthReducer';
import { setRating, SetRating } from '../../Actions/Rating';

interface State {
  RatingReducer: RatingState;
  AuthReducer: AuthState;
}
interface StateProps {
  ratings: Rating[];
  socket: any;
}

function mapStateToProps({ RatingReducer, AuthReducer }: State): StateProps {
  return {
    ratings: RatingReducer.ratings,
    socket: AuthReducer.socket,
  };
}

interface DispatchProps {
  setRating: (rating: Rating) => void;
}

type PodcastEpisodeActions = SetRating;

function mapDispatchToProps(dispatch: Dispatch<PodcastEpisodeActions>): DispatchProps {
  return {
    setRating: (rating: Rating) => dispatch(setRating(rating)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastEpisode);
