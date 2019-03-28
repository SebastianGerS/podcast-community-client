import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Filters } from '../../../Models/Filters';

interface SetSearchFiltersStart {
  type: ActionTypes.SET_SEARCHFILTERS_START;
}

export const startSetSearchFilters = (): SetSearchFiltersStart => (
  { type: ActionTypes.SET_SEARCHFILTERS_START }
);

interface SetSearchFiltersSuccess {
  type: ActionTypes.SET_SEARCHFILTERS_SUCCESS;
  filters: Filters;
}

export const setSearchFilters = (filters: Filters): SetSearchFiltersSuccess => (
  {
    type: ActionTypes.SET_SEARCHFILTERS_SUCCESS,
    filters,
  }
);

interface SetSearchFiltersFailure {
  type: ActionTypes.SET_SEARCHFILTERS_FAILURE;
}

export const setSearchFiltersFailure = (): SetSearchFiltersFailure => (
  { type: ActionTypes.SET_SEARCHFILTERS_FAILURE }
);

export type SetSearchFiltersAction = SetSearchFiltersStart | SetSearchFiltersSuccess | SetSearchFiltersFailure;

type AttemptSetSearchFiltersAction = (dispatch: Dispatch<SetSearchFiltersAction>) => void;

export const attemptSetSearchFilters = (filters: Filters): AttemptSetSearchFiltersAction => (
  dispatch: Dispatch<SetSearchFiltersAction>,
): void => {
  dispatch(startSetSearchFilters());

  if (filters) {
    dispatch(setSearchFilters(filters));
  } else {
    dispatch(setSearchFiltersFailure());
  }
};
