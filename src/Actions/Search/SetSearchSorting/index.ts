import { Dispatch } from 'redux';
import * as ActionTypes from './types';

interface SetSearchSortingStart {
  type: ActionTypes.SET_SEARCHSORTING_START;
}

export const startSetSearchSorting = (): SetSearchSortingStart => (
  { type: ActionTypes.SET_SEARCHSORTING_START }
);

interface SetSearchSortingSuccess {
  type: ActionTypes.SET_SEARCHSORTING_SUCCESS;
  sorting: string;
}

export const setSearchSorting = (sorting: string): SetSearchSortingSuccess => (
  {
    type: ActionTypes.SET_SEARCHSORTING_SUCCESS,
    sorting,
  }
);

interface SetSearchSortingFailure {
  type: ActionTypes.SET_SEARCHSORTING_FAILURE;
}

export const setSearchSortingFailure = (): SetSearchSortingFailure => (
  { type: ActionTypes.SET_SEARCHSORTING_FAILURE }
);

export type SetSearchSortingAction = SetSearchSortingStart | SetSearchSortingSuccess | SetSearchSortingFailure;

type AttemptSetSearchSortingAction = (dispatch: Dispatch<SetSearchSortingAction>) => void;

export const attemptSetSearchSorting = (sorting: string): AttemptSetSearchSortingAction => (
  dispatch: Dispatch<SetSearchSortingAction>,
): void => {
  dispatch(startSetSearchSorting());

  if (sorting) {
    dispatch(setSearchSorting(sorting));
  } else {
    dispatch(setSearchSortingFailure());
  }
};
