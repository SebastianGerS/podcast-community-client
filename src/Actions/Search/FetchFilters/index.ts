import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { setMessage, SetMessage } from '../../Message';
import { Genre } from '../../../Models/Genre';

interface FetchFiltersStart {
  type: ActionTypes.FETCH_FILTERS_START;
}

export const startFetchFilters = (): FetchFiltersStart => (
  { type: ActionTypes.FETCH_FILTERS_START }
);

interface FetchFiltersSuccess {
  type: ActionTypes.FETCH_FILTERS_SUCCESS;
  genres: Genre[];
  languages: string[];
}

export const fetchFiltersSuccess = (genres: Genre[], languages: string[]): FetchFiltersSuccess => (
  {
    type: ActionTypes.FETCH_FILTERS_SUCCESS,
    genres,
    languages,
  }
);

interface FetchFiltersFailure {
  type: ActionTypes.FETCH_FILTERS_FAILURE;
}

export const fetchFiltersFailure = (): FetchFiltersFailure => (
  { type: ActionTypes.FETCH_FILTERS_FAILURE }
);

export type FetchFiltersAction = FetchFiltersStart | FetchFiltersSuccess | FetchFiltersFailure;

type AttemptFetchFiltersAction = (dispatch: Dispatch<FetchFiltersAction | SetMessage>) => Promise<void>;

const fetchFilters = (path: string): Promise<Response> => Fetch(path, 'GET', {});

export const attemptFetchFilters = (): AttemptFetchFiltersAction => async (
  dispatch: Dispatch<FetchFiltersAction | SetMessage>,
): Promise<void> => {
  dispatch(startFetchFilters());
  const response = await fetchFilters('/filters');

  if (response.error) {
    dispatch(fetchFiltersFailure());
    dispatch(setMessage({ text: 'Failed to fetch filter data', type: 'warning' }));
  } else {
    dispatch(fetchFiltersSuccess(response.genres, response.languages));
  }
};
