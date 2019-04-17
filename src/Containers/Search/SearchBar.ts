import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SearchBar from '../../Components/Search/SearchBar';
import { attemptSearch, SearchData, AttemptSearchActions } from '../../Actions/Search';
import { AuthState } from '../../Reducers/AuthReducer';
import { SearchState } from '../../Reducers/SearchReducer';
import { Filters } from '../../Models/Filters';
import { SetMessage } from '../../Actions/Message';
import { ResetRatings } from '../../Actions/Rating';
import { toggleFollowsModal, ToggleFollowsModal } from '../../Actions/Modal';
import { UserState } from '../../Reducers/UserReducer';

interface State {
  AuthReducer: AuthState;
  SearchReducer: SearchState;
  UserReducer: UserState;
}

interface StateProps {
  isLogedIn: boolean;
  type: string;
  redirectToSearch: boolean;
  filters: Filters;
  sorting: string;
  followsOnline: boolean;
}

function mapStateToProps({ AuthReducer, SearchReducer, UserReducer }: State): StateProps {
  return {
    isLogedIn: AuthReducer.isLogedIn,
    type: SearchReducer.type,
    redirectToSearch: SearchReducer.redirectToSearch,
    filters: SearchReducer.filters,
    sorting: SearchReducer.sorting,
    followsOnline: UserReducer.onlineUsers.size > 0,
  };
}

interface DispatchProps {
  search: (query: object) => void;
  toggleFollowsModal: () => void;
}

type SearchBarActions = AttemptSearchActions | SetMessage | ResetRatings | ToggleFollowsModal;

function mapDispatchToProps(dispatch: Dispatch<SearchBarActions>): DispatchProps {
  return {
    search: (query: SearchData) => attemptSearch(query)(dispatch),
    toggleFollowsModal: () => dispatch(toggleFollowsModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
