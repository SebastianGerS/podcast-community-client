import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SearchBar from '../../Components/Search/SearchBar';
import { attemptSearch, SearchData, AttemptSearchActions } from '../../Actions/Search';
import { AuthState } from '../../Reducers/AuthReducer';
import { SearchState } from '../../Reducers/SearchReducer';
import { Filters } from '../../Models/Filters';
import { SetMessage } from '../../Actions/Message';
import { ResetRatings } from '../../Actions/Rating';

interface State {
  AuthReducer: AuthState;
  SearchReducer: SearchState;
}

interface StateProps {
  isLogedIn: boolean;
  type: string;
  redirectToSearch: boolean;
  filters: Filters;
  sorting: string;
}

function mapStateToProps({ AuthReducer, SearchReducer }: State): StateProps {
  return {
    isLogedIn: AuthReducer.isLogedIn,
    type: SearchReducer.type,
    redirectToSearch: SearchReducer.redirectToSearch,
    filters: SearchReducer.filters,
    sorting: SearchReducer.sorting,
  };
}

interface DispatchProps {
  search: (query: object) => void;
}

type SearchBarActions = AttemptSearchActions | SetMessage | ResetRatings;

function mapDispatchToProps(dispatch: Dispatch<SearchBarActions>): DispatchProps {
  return {
    search: (query: SearchData) => attemptSearch(query)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
