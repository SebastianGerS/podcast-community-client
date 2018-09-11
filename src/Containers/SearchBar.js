import { connect } from 'react-redux';
import SearchBar from '../Components/Search/SearchBar';
import { atemptSearch } from '../Actions/Search';

function mapStateToProps(state) {
  return {
    isLogedIn: state.Auth.isLogedIn,
    type: state.Search.type,
    redirectToSearch: state.Search.redirectToSearch,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    search: query => dispatch(atemptSearch(query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
