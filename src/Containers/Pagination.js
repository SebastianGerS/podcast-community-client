import { connect } from 'react-redux';
import Pagination from '../Components/Search/Pagination';
import { atemptSearch } from '../Actions/Search';

function mapStateToProps(state) {
  return {
    isLogedIn: state.Auth.isLogedIn,
    morePages: state.Search.morePages,
    term: state.Search.term,
    type: state.Search.type,
    offset: state.Search.offset,
    redirectToSearch: state.Search.redirectToSearch,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    search: query => dispatch(atemptSearch(query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
