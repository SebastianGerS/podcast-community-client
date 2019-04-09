import { connect } from 'react-redux';
import ListableEpisode from '../../Components/Search/ListableEpisode';
import { SearchState } from '../../Reducers/SearchReducer';
import { Rating } from '../../Models/Rating';

interface State {
  SearchReducer: SearchState;
}

interface StateProps {
  ratings: Rating[];
}

function mapStateToProps({ SearchReducer }: State): StateProps {
  return {
    ratings: SearchReducer.ratings,
  };
}

export default connect(mapStateToProps)(ListableEpisode);
