import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ListablePodcast from '../../Components/Search/ListablePodcast';
import { Rating } from '../../Models/Rating';
import { AuthState } from '../../Reducers/AuthReducer';
import { RatingState } from '../../Reducers/RatingReducer';
import { setRating, SetRating } from '../../Actions/Rating';

interface State {
  AuthReducer: AuthState;
  RatingReducer: RatingState;
}

interface StateProps {
  ratings: Rating[];
  socket: any;
}

function mapStateToProps({ AuthReducer, RatingReducer }: State): StateProps {
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

export default connect(mapStateToProps, mapDispatchToProps)(ListablePodcast);
