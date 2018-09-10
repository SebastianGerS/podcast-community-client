import { connect } from 'react-redux';
import SearchResults from '../Components/Search/SearchResults';

function mapStateToProps(state) {
  return {
    type: state.Search.type,
    results: state.Search.results,
  };
}


export default connect(mapStateToProps)(SearchResults);