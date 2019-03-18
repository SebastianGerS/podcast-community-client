import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../../Message';
import { Podcast } from '../../../Models/Podcast';
import { Episode } from '../../../Models/Episode';
import { User } from '../../../Models/User';

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
