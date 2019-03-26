import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SearchBar from '../../Components/Search/SearchBar';
import { attemptSearch, SearchData, AttemptSearchActions } from '../../Actions/Search';
import { AuthState } from '../../Reducers/AuthReducer';
import { SearchState } from '../../Reducers/SearchReducer';
import { Filters } from '../../Models/Filters';

interface State {
  AuthReducer: AuthState;
  SearchReducer: SearchState;
}

interface StateProps {
  isLogedIn: boolean;
  type: string;
  redirectToSearch: boolean;
  filters: Filters;
}

function mapStateToProps({ AuthReducer, SearchReducer }: State): StateProps {
  return {
    isLogedIn: AuthReducer.isLogedIn,
    type: SearchReducer.type,
    redirectToSearch: SearchReducer.redirectToSearch,
    filters: SearchReducer.filters,
  };
}

interface DispatchProps {
  search: (query: object) => void;
}

function mapDispatchToProps(dispatch: Dispatch<AttemptSearchActions>): DispatchProps {
  return {
    search: (query: SearchData) => attemptSearch(query)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
