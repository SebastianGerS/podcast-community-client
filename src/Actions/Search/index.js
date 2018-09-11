import * as R from 'ramda';
import ActionTypes from './types';
import Fetch from '../../Helpers/Fetch';

export const startSetSearchType = () => (
  { type: ActionTypes.SET_SEARCHTYPE_START }
);
export const setSearchType = searchType => (
  {
    type: ActionTypes.SET_SEARCHTYPE_SUCESS,
    searchType,
  }
);

export const setSearchTypeFailure = () => (
  { type: ActionTypes.SET_SEARCHTYPE_FAILUR }
);
export const startSetSearchFilters = () => (
  { type: ActionTypes.SET_SEARCHFILTERS_START }
);
export const setSearchFilters = filters => (
  {
    type: ActionTypes.SET_SEARCHFILTERS_SUCESS,
    filters,
  }
);

export const setSearchFiltersFailure = () => (
  { type: ActionTypes.SET_SEARCHFILTERS_FAILUR }
);
export const startSetSearchSortBy = () => (
  { type: ActionTypes.SET_SEARCHSORTBY_START }
);
export const setSearchSortBy = sortBy => (
  {
    type: ActionTypes.SET_SEARCHSORTBY_SUCESS,
    sortBy,
  }
);

export const setSearchSortByFailure = () => (
  { type: ActionTypes.SET_SEARCHTYPE_FAILUR }
);

export const startSearch = redirect => (
  {
    type: ActionTypes.SEARCH_START,
    redirect,
  }
);
export const searchComplete = data => (
  {
    type: ActionTypes.SEARCH_SUCESS,
    data,
  }
);

export const SearchFailure = () => (
  { type: ActionTypes.SEARCH_FAILUR }
);

export const atemptSetSearchTypes = data => (dispatch) => {
  dispatch(startSetSearchType());

  if (data) {
    dispatch(setSearchType(data));
  } else {
    dispatch(setSearchTypeFailure());
  }
};

export const atemptSetSearchFilters = data => (dispatch) => {
  dispatch(startSetSearchFilters());

  if (data) {
    dispatch(setSearchFilters(data));
  } else {
    dispatch(setSearchFiltersFailure());
  }
};

export const atemptSetSearchSortBy = data => (dispatch) => {
  dispatch(startSetSearchSortBy());

  if (data) {
    dispatch(setSearchSortBy(data));
  } else {
    dispatch(setSearchSortByFailure());
  }
};
const search = R.partialRight(Fetch, ['GET', {}]);

export const atemptSearch = data => async (dispatch) => {
  const {
    term, type, offset, path,
  } = data;

  const redirecToSearch = path !== '/search';

  dispatch(startSearch(redirecToSearch));

  const query = `/search?term=${term}&type=${type}&offset=${offset}`;

  const response = await search(query);

  if (response.error) dispatch(SearchFailure());

  if (response.result) dispatch(searchComplete(response));
};
