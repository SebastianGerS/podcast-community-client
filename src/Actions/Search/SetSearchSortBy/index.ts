import { Dispatch } from 'redux';
import * as ActionTypes from './types';

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
  type: ActionTypes.SET_SEARCHSORTBY_FAILUR;
}

export const setSearchSortByFailure = (): SetSearchSortByFailure => (
  { type: ActionTypes.SET_SEARCHSORTBY_FAILUR }
);

export type SetSearchSortByAction = SetSearchSortByStart | SetSearchSortBySuccess | SetSearchSortByFailure;

type AttemptSetSearchSortByAction = (dispatch: Dispatch<SetSearchSortByAction>) => void;

export const attemptSetSearchSortBy = (data: string): AttemptSetSearchSortByAction => (
  dispatch: Dispatch<SetSearchSortByAction>,
): void => {
  dispatch(startSetSearchSortBy());

  if (data) {
    dispatch(setSearchSortBy(data));
  } else {
    dispatch(setSearchSortByFailure());
  }
};
