import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SearchInterface from '../../Components/Search/SearchInterface';
import { atemptSearch, SearchData, AtemptSearchActions } from '../../Actions/Search';
import { SearchState } from '../../Reducers/SearchReducer';
import { AuthState } from '../../Reducers/AuthReducer';


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
  redirectToSearch: boolean;
}

function mapStateToProps({ SearchReducer, AuthReducer }: State): StateProps {
  return {
    isLogedIn: AuthReducer.isLogedIn,
    morePages: SearchReducer.morePages,
    term: SearchReducer.term,
    type: SearchReducer.type,
    offset: SearchReducer.offset,
    isSearching: SearchReducer.isSearching,
    redirectToSearch: SearchReducer.redirectToSearch,
  };
}
interface DispatchProps {
  search: (query: SearchData) => void;
}

function mapDispatchToProps(dispatch: Dispatch<AtemptSearchActions>): DispatchProps {
  return {
    search: (query: SearchData) => atemptSearch(query)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInterface);
