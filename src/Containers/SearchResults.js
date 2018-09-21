import { connect } from 'react-redux';
import SearchResults from '../Components/Search/SearchResults';

function mapStateToProps(state) {
  return {
    type: state.Search.type,
    results: state.Search.results,
    isSearching: state.Search.isSearching,
    isCreatingEvent: state.Event.isCreatingEvent,
  };
}


export default connect(mapStateToProps)(SearchResults);
