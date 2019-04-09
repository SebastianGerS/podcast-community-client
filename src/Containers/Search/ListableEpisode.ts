import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ListableEpisode from '../../Components/Search/ListableEpisode';
import { SearchState } from '../../Reducers/SearchReducer';
import { Rating } from '../../Models/Rating';
import { UpdateRating, updateRating } from '../../Actions/Search';
import { AuthState } from '../../Reducers/AuthReducer';

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

export default connect(mapStateToProps, mapDispatchToProps)(ListableEpisode);
