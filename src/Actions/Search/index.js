import ActionTypes from './types';

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
