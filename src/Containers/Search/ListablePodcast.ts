import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ListablePodcast from '../../Components/Search/ListablePodcast';
import { SearchState } from '../../Reducers/SearchReducer';
import { Rating } from '../../Models/Rating';
import { AuthState } from '../../Reducers/AuthReducer';
import { updateRating, UpdateRating } from '../../Actions/Search';

interface State {
  SearchReducer: SearchState;
  AuthReducer: AuthState;
}

interface StateProps {
  ratings: Rating[];
  socket: any;
}

function mapStateToProps({ SearchReducer, AuthReducer }: State): StateProps {
  return {
    ratings: SearchReducer.ratings,
    socket: AuthReducer.socket,
  };
}

interface DispatchProps {
  updateRating: (rating: Rating) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<UpdateRating>): DispatchProps => ({
  updateRating: (rating: Rating) => dispatch(updateRating(rating)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListablePodcast);
