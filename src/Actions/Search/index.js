import ActionTypes from './types';
import { Fetch } from '../../Helpers/Fetch';
import { atemptSetMessage } from '../Message';

export const startSetSearchType = () => (
  { type: ActionTypes.SET_SEARCHTYPE_START }
);
export const setSearchType = searchType => (
  {
    type: ActionTypes.SET_SEARCHTYPE_SUCCESS,
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
    type: ActionTypes.SET_SEARCHFILTERS_SUCCESS,
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
    type: ActionTypes.SET_SEARCHSORTBY_SUCCESS,
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
    type: ActionTypes.SEARCH_SUCCESS,
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
const search = path => Fetch(path, 'GET', {});

export const atemptSearch = data => async (dispatch) => {
  const {
    term, type, offset, path,
  } = data;

  const redirecToSearch = path !== '/search';

  dispatch(startSearch(redirecToSearch));

  const query = `/search?term=${term}&type=${type}&offset=${offset}`;

  const response = await search(query).catch(error => error);

  if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ message: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

  if (response.error) {
    dispatch(SearchFailure());

    dispatch(atemptSetMessage({ message: response.error.errmsg, type: 'info' }));
  }
  if (response.results) dispatch(searchComplete(response));
};
