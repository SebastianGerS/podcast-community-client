import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ListableEpisode from '../../Components/Search/ListableEpisode';
import { Rating } from '../../Models/Rating';
import { AuthState } from '../../Reducers/AuthReducer';
import { SetRating, setRating } from '../../Actions/Rating';
import { RatingState } from '../../Reducers/RatingReducer';

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

const mapDispatchToProps = (dispatch: Dispatch<SetRating>): DispatchProps => ({
  setRating: (rating: Rating) => dispatch(setRating(rating)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListableEpisode);
