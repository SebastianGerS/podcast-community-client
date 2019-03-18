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
  type: ActionTypes.SET_SEARCHTYPE_FAILUR;
}

export const setSearchTypeFailure = (): SetSearchTypeFailure => (
  { type: ActionTypes.SET_SEARCHTYPE_FAILUR }
);

export type SetSearchTypeAction = SetSearchTypeStart | SetSearchTypeSuccess | SetSearchTypeFailure;

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
