import { Dispatch } from 'redux';
import * as ActionTypes from './types';

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

export type SetSearchFiltersAction = SetSearchFiltersStart | SetSearchFiltersSuccess | SetSearchFiltersFailure;

type AttemptSetSearchFiltersAction = (dispatch: Dispatch<SetSearchFiltersAction>) => void;

export const attemptSetSearchFilters = (data: string): AttemptSetSearchFiltersAction => (
  dispatch: Dispatch<SetSearchFiltersAction>,
): void => {
  dispatch(startSetSearchFilters());

  if (data) {
    dispatch(setSearchFilters(data));
  } else {
    dispatch(setSearchFiltersFailure());
  }
};
