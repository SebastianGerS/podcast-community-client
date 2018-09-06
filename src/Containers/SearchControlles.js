import { connect } from 'react-redux';
import SearchControlles from '../Components/Search/SearchControlles';
import { atemptSetSearchFilters, atemptSetSearchTypes, atemptSetSearchSortBy } from '../Actions/Search';

function mapStateToProps(state) {
  return {
    type: state.Search.type,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setType: data => dispatch(atemptSetSearchTypes(data)),
    setFilters: data => dispatch(atemptSetSearchFilters(data)),
    setSortBy: data => dispatch(atemptSetSearchSortBy(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchControlles);
