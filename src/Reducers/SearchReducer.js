import ActionTypes from '../Actions/Search/types';
import User from '../Models/User';
import Episode from '../Models/Episode';
import Podcast from '../Models/Podcast';

const DEFAULT_STATE = {
  isSearching: false,
  isUpdatingSearchSettings: false,
  type: 'podcast',
  filters: '',
  sortBy: '',
  results: [],
  term: '',
  morePages: false,
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
      let results;
      switch (state.type) {
        case 'user':
          results = action.data.results.map(user => new User(user));
          break;
        case 'episode':
          results = action.data.results.map(episode => new Episode(episode));
          break;
        case 'podcast':
          results = action.data.results.map(podcast => new Podcast(podcast));
          break;
        default:
          results = [];
          break;
      }
      return {
        ...state,
        redirectToSearch: false,
        results,
        term: action.data.term,
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
