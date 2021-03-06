import { Dispatch } from 'redux';
import * as ActionTypes from './types';

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
  type: ActionTypes.SET_SEARCHTYPE_FAILURE;
}

export const setSearchTypeFailure = (): SetSearchTypeFailure => (
  { type: ActionTypes.SET_SEARCHTYPE_FAILURE }
);

export type SetSearchTypeAction = SetSearchTypeStart | SetSearchTypeSuccess | SetSearchTypeFailure;

type AttemptSetSearchTypesAction = (dispatch: Dispatch<SetSearchTypeAction>) => void;

export const attemptSetSearchTypes = (data: string): AttemptSetSearchTypesAction => (
  dispatch: Dispatch<SetSearchTypeAction>,
): void => {
  dispatch(startSetSearchType());

  if (data) {
    dispatch(setSearchType(data));
  } else {
    dispatch(setSearchTypeFailure());
  }
};
