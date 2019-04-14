import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { Podcast } from '../../../Models/Podcast';
import { Episode } from '../../../Models/Episode';
import { User } from '../../../Models/User';
import { Filters } from '../../../Models/Filters';
import { resetRatings, ResetRatings } from '../../Rating';

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
  type: ActionTypes.SEARCH_FAILURE;
}

export const SearchFailure = (): SearchFailure => (
  { type: ActionTypes.SEARCH_FAILURE }
);

export type AttemptSearchActions = SearchStart | SearchSuccess | SearchFailure;

const search = (path: string): Promise<Response> => Fetch(path, 'GET', {});

export interface SearchData {
  term: string;
  filters: Filters;
  type: string;
  offset: number;
  path: string;
  sorting: string | number;
}

type AttemptSearchAction = (dispatch: Dispatch<AttemptSearchActions|SetMessage|ResetRatings>) => Promise<void>;

export const attemptSearch = (data: SearchData): AttemptSearchAction => async (
  dispatch: Dispatch<AttemptSearchActions|SetMessage|ResetRatings>,
): Promise<void> => {
  const {
    term, type, offset, path, filters, sorting,
  } = data;

  const redirecToSearch = path !== '/search';

  dispatch(resetRatings());
  dispatch(startSearch(redirecToSearch));

  const encodedFilters = encodeURIComponent(JSON.stringify(filters));

  const query = `/search?term=${term}&type=${type}&offset=${offset}&filters=${encodedFilters}&sorting=${sorting}`;

  const response = await search(query).catch(error => error);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(SearchFailure());

    attemptSetMessage({ text: response.error.errmsg, type: 'info' })(dispatch);
  }
  if (response.results) dispatch(searchComplete(response));
};
