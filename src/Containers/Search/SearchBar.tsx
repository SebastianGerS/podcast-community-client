import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SearchBar from '../../Components/Search/SearchBar';
import { atemptSearch, SearchData, AtemptSearchActions } from '../../Actions/Search';
import { AuthState } from '../../Reducers/AuthReducer';
import { SearchState } from '../../Reducers/SearchReducer';

interface State {
  AuthReducer: AuthState;
  SearchReducer: SearchState;
}

interface StateProps {
  isLogedIn: boolean;
  type: string;
  redirectToSearch: boolean;
}

function mapStateToProps({ AuthReducer, SearchReducer }: State): StateProps {
  return {
    isLogedIn: AuthReducer.isLogedIn,
    type: SearchReducer.type,
    redirectToSearch: SearchReducer.redirectToSearch,
  };
}

interface DispatchProps {
  search: (query: object) => void;
}

function mapDispatchToProps(dispatch: Dispatch<AtemptSearchActions>): DispatchProps {
  return {
    search: (query: SearchData) => atemptSearch(query)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
