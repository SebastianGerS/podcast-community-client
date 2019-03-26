import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';
import SearchControlles from '../../Components/Search/SearchControlles';
import {
  attemptSetSearchTypes, SetSearchTypeAction, attemptSetSearchFilters,
  SetSearchFiltersAction, FetchFiltersAction, attemptFetchFilters,
} from '../../Actions/Search';
import { SearchState } from '../../Reducers/SearchReducer';
import { Filters } from '../../Models/Filters';
import { Genre } from '../../Models/Genre';

interface State {
  SearchReducer: SearchState;
}

interface StateProps {
  type: string;
  filters: Filters;
  genres: List<Genre>;
  languages: List<string>;
}

function mapStateToProps({ SearchReducer }: State): StateProps {
  return {
    type: SearchReducer.type,
    filters: SearchReducer.filters,
    genres: SearchReducer.genres,
    languages: SearchReducer.languages,
  };
}

interface DispatchProps {
  attemptSetType: (data: string) => void;
  attemptSetFilters: (filters: Filters) => void;
  getFilters: () => void;
}

type SearchControllesActions = SetSearchTypeAction | SetSearchFiltersAction | FetchFiltersAction;

function mapDispatchToProps(dispatch: Dispatch<SearchControllesActions>): DispatchProps {
  return {
    attemptSetType: (data: string) => attemptSetSearchTypes(data)(dispatch),
    attemptSetFilters: (filters: Filters) => attemptSetSearchFilters(filters)(dispatch),
    getFilters: () => attemptFetchFilters()(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchControlles);
