import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SearchInterface from '../../Components/Search/SearchInterface';
import { attemptSearch, SearchData, AttemptSearchActions } from '../../Actions/Search';
import { SearchState } from '../../Reducers/SearchReducer';
import { AuthState } from '../../Reducers/AuthReducer';
import { Filters } from '../../Models/Filters';
import { SetMessage } from '../../Actions/Message';
import { ResetRatings } from '../../Actions/Rating';
import { SetRedirect } from '../../Actions/Redirect';


interface State {
  SearchReducer: SearchState;
  AuthReducer: AuthState;
}

interface StateProps {
  isLogedIn: boolean;
  morePages: boolean;
  term: string;
  type: string;
  offset: number;
  isSearching: boolean;
  filters: Filters;
  sorting: string;
}

function mapStateToProps({ SearchReducer, AuthReducer }: State): StateProps {
  return {
    isLogedIn: AuthReducer.isLogedIn,
    morePages: SearchReducer.morePages,
    term: SearchReducer.term,
    type: SearchReducer.type,
    offset: SearchReducer.offset,
    isSearching: SearchReducer.isSearching,
    filters: SearchReducer.filters,
    sorting: SearchReducer.sorting,
  };
}
interface DispatchProps {
  search: (query: SearchData) => void;
}

type SearchInterfaceActions = AttemptSearchActions | SetMessage | ResetRatings | SetRedirect;

function mapDispatchToProps(dispatch: Dispatch<SearchInterfaceActions>): DispatchProps {
  return {
    search: (query: SearchData) => attemptSearch(query)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInterface);
