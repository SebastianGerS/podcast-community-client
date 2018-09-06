import ActionTypes from '../Actions/Search/types';

const DEFAULT_STATE = {
  isSearching: false,
  isUpdatingSearchSettings: false,
  type: 'podcast',
  filters: '',
  sortBy: '',
  results: [],
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.SET_SEARCHTYPE_START:
      return { ...state, isUpdatingSearchSettings: true };
    case ActionTypes.SET_SEARCHTYPE_SUCESS:
      return { ...state, type: action.searchType, isUpdatingSearchSettings: false };
    case ActionTypes.SET_SEARCHTYPE_FAILUR:
      return { ...state, isUpdatingSearchSettings: false };
    default:
      return { ...state };
  }
}
