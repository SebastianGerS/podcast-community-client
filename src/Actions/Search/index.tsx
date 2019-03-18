import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../Message';
import { Podcast } from '../../Models/Podcast';
import { Episode } from '../../Models/Episode';
import { User } from '../../Models/User';

interface SetSearchTypeStart {
  type: ActionTypes.SET_SEARCHTYPE_START;
}

export const startSetSearchType = (): SetSearchTypeStart => (
  { type: ActionTypes.SET_SEARCHTYPE_START }
);

interface SetSearchTypeSuccess {
  type: ActionTypes.SET_SEARCHTYPE_SUCCESS;
  searchType: string;
}

export const setSearchType = (searchType: string): SetSearchTypeSuccess => (
  {
    type: ActionTypes.SET_SEARCHTYPE_SUCCESS,
    searchType,
  }
);

interface SetSearchTypeFailure {
  type: ActionTypes.SET_SEARCHTYPE_FAILUR;
}

export const setSearchTypeFailure = (): SetSearchTypeFailure => (
  { type: ActionTypes.SET_SEARCHTYPE_FAILUR }
);

export type SetSearchTypeAction = SetSearchTypeStart | SetSearchTypeSuccess | SetSearchTypeFailure;

interface SetSearchFiltersStart {
  type: ActionTypes.SET_SEARCHFILTERS_START;
}

export const startSetSearchFilters = (): SetSearchFiltersStart => (
  { type: ActionTypes.SET_SEARCHFILTERS_START }
);

interface SetSearchFiltersSuccess {
  type: ActionTypes.SET_SEARCHFILTERS_SUCCESS;
  filters: string;
}

export const setSearchFilters = (filters: string): SetSearchFiltersSuccess => (
  {
    type: ActionTypes.SET_SEARCHFILTERS_SUCCESS,
    filters,
  }
);

interface SetSearchFiltersFailure {
  type: ActionTypes.SET_SEARCHFILTERS_FAILUR;
}

export const setSearchFiltersFailure = (): SetSearchFiltersFailure => (
  { type: ActionTypes.SET_SEARCHFILTERS_FAILUR }
);

type SetSearchFiltersAction = SetSearchFiltersStart | SetSearchFiltersSuccess | SetSearchFiltersFailure;

interface SetSearchSortByStart {
  type: ActionTypes.SET_SEARCHSORTBY_START;
}

export const startSetSearchSortBy = (): SetSearchSortByStart => (
  { type: ActionTypes.SET_SEARCHSORTBY_START }
);

interface SetSearchSortBySuccess {
  type: ActionTypes.SET_SEARCHSORTBY_SUCCESS;
  sortBy: string;
}

export const setSearchSortBy = (sortBy: string): SetSearchSortBySuccess => (
  {
    type: ActionTypes.SET_SEARCHSORTBY_SUCCESS,
    sortBy,
  }
);

interface SetSearchSortByFailure {
  type: ActionTypes.SET_SEARCHTYPE_FAILUR;
}

export const setSearchSortByFailure = (): SetSearchSortByFailure => (
  { type: ActionTypes.SET_SEARCHTYPE_FAILUR }
);

type SetSearchSortByAction = SetSearchSortByStart | SetSearchSortBySuccess | SetSearchSortByFailure;

interface SearchStart {
  type: ActionTypes.SEARCH_START;
  redirect: boolean;
}

export const startSearch = (redirect: boolean): SearchStart => (
  {
    type: ActionTypes.SEARCH_START,
    redirect,
  }
);

interface SearchResult {
  morePages: boolean;
  next_offset: number;
  count: number;
  results: (User| Podcast | Episode) [];
  total: number;
  term: string;
}
interface SearchSuccess {
  type: ActionTypes.SEARCH_SUCCESS;
  data: SearchResult;
}

export const searchComplete = (data: SearchResult): SearchSuccess => (
  {
    type: ActionTypes.SEARCH_SUCCESS,
    data,
  }
);

interface SearchFailure {
  type: ActionTypes.SEARCH_FAILUR;
}

export const SearchFailure = (): SearchFailure => (
  { type: ActionTypes.SEARCH_FAILUR }
);

export type AtemptSearchActions = SearchStart | SearchSuccess | SearchFailure;

type AtemptSetSearchTypesAction = (dispatch: Dispatch<SetSearchTypeAction>) => void;

export const atemptSetSearchTypes = (data: string): AtemptSetSearchTypesAction => (
  dispatch: Dispatch<SetSearchTypeAction>,
): void => {
  dispatch(startSetSearchType());

  if (data) {
    dispatch(setSearchType(data));
  } else {
    dispatch(setSearchTypeFailure());
  }
};

type AtemptSetSearchFiltersAction = (dispatch: Dispatch<SetSearchFiltersAction>) => void;

export const atemptSetSearchFilters = (data: string): AtemptSetSearchFiltersAction => (
  dispatch: Dispatch<SetSearchFiltersAction>,
): void => {
  dispatch(startSetSearchFilters());

  if (data) {
    dispatch(setSearchFilters(data));
  } else {
    dispatch(setSearchFiltersFailure());
  }
};

type AtemptSetSearchSortByAction = (dispatch: Dispatch<SetSearchSortByAction>) => void;

export const atemptSetSearchSortBy = (data: string): AtemptSetSearchSortByAction => (
  dispatch: Dispatch<SetSearchSortByAction>,
): void => {
  dispatch(startSetSearchSortBy());

  if (data) {
    dispatch(setSearchSortBy(data));
  } else {
    dispatch(setSearchSortByFailure());
  }
};

const search = (path: string): Promise<Response> => Fetch(path, 'GET', {});

export interface SearchData {
  term: string;
  type: string;
  offset: number;
  path: string;
}

type AtemptSearchAction = (dispatch: Dispatch<AtemptSearchActions|SetMessage>) => Promise<void>;

export const atemptSearch = (data: SearchData): AtemptSearchAction => async (
  dispatch: Dispatch<AtemptSearchActions|SetMessage>,
): Promise<void> => {
  const {
    term, type, offset, path,
  } = data;

  const redirecToSearch = path !== '/search';

  dispatch(startSearch(redirecToSearch));

  const query = `/search?term=${term}&type=${type}&offset=${offset}`;

  const response = await search(query).catch(error => error);

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(SearchFailure());

    atemptSetMessage({ text: response.error.errmsg, type: 'info' })(dispatch);
  }
  if (response.results) dispatch(searchComplete(response));
};

export type SearchAction = SetSearchFiltersAction | SetSearchSortByAction | SetSearchTypeAction | AtemptSearchActions;
