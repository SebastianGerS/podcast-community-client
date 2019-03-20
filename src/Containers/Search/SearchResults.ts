import { connect } from 'react-redux';
import SearchResults from '../../Components/Search/SearchResults';
import { SearchState } from '../../Reducers/SearchReducer';
import { User } from '../../Models/User';
import { Podcast } from '../../Models/Podcast';
import { Episode } from '../../Models/Episode';

interface State {
  SearchReducer: SearchState;
}

interface StateProps {
  type: string;
  results: (User|Podcast|Episode)[];
  isSearching: boolean;
}

function mapStateToProps({ SearchReducer }: State): StateProps {
  return {
    type: SearchReducer.type,
    results: SearchReducer.results,
    isSearching: SearchReducer.isSearching,
  };
}

export default connect(mapStateToProps)(SearchResults);
