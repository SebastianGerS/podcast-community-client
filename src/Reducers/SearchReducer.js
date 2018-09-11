import ActionTypes from '../Actions/Search/types';

const DEFAULT_STATE = {
  isSearching: false,
  isUpdatingSearchSettings: false,
  type: 'podcast',
  filters: '',
  sortBy: '',
  results: [],
  morePage: true,
  offset: 0,
  redirectToSearch: false,
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.SET_SEARCHTYPE_START:
      return { ...state, isUpdatingSearchSettings: true };
    case ActionTypes.SET_SEARCHTYPE_SUCESS:
      return {
        ...state, type: action.searchType, isUpdatingSearchSettings: false,
      };
    case ActionTypes.SET_SEARCHTYPE_FAILUR:
      return { ...state, isUpdatingSearchSettings: false };
    case ActionTypes.SEARCH_START:
      return { ...state, isSearching: true, redirectToSearch: action.redirect };
    case ActionTypes.SEARCH_SUCESS:
      return {
        ...state,
        redirectToSearch: false,
        results: action.data.result,
        offset: action.data.next_offset,
        morePages: action.data.morePages,
        isSearching: false,
      };
    case ActionTypes.SEARCH_FAILUR:
      return { ...state, isSearching: false, redirectToSearch: false };
    default:
      return { ...state, redirectToSearch: false };
  }
}
