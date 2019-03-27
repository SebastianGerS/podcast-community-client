import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';
import SearchControlles from '../../Components/Search/SearchControlles';
import {
  attemptSetSearchTypes, SetSearchTypeAction, attemptSetSearchFilters,
  SetSearchFiltersAction, FetchFiltersAction, attemptFetchFilters,
  attemptSetSearchSorting,
  SetSearchSortingAction,
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
  sorting: string;
}

function mapStateToProps({ SearchReducer }: State): StateProps {
  return {
    type: SearchReducer.type,
    filters: SearchReducer.filters,
    genres: SearchReducer.genres,
    languages: SearchReducer.languages,
    sorting: SearchReducer.sorting,
  };
}

interface DispatchProps {
  attemptSetType: (data: string) => void;
  attemptSetFilters: (filters: Filters) => void;
  getFilters: () => void;
  setSorting: (sorting: string) => void;
}

type SearchControllesActions = (
  SetSearchTypeAction | SetSearchFiltersAction | FetchFiltersAction | SetSearchSortingAction
);

function mapDispatchToProps(dispatch: Dispatch<SearchControllesActions>): DispatchProps {
  return {
    attemptSetType: (data: string) => attemptSetSearchTypes(data)(dispatch),
    attemptSetFilters: (filters: Filters) => attemptSetSearchFilters(filters)(dispatch),
    getFilters: () => attemptFetchFilters()(dispatch),
    setSorting: (sorting: string) => attemptSetSearchSorting(sorting)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchControlles);
