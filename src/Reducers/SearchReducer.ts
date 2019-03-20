import * as ActionTypes from '../Actions/Search/types';
import { User } from '../Models/User';
import { Episode } from '../Models/Episode';
import { Podcast } from '../Models/Podcast';
import { SearchAction } from '../Actions/Search/index';

export interface SearchState {
  isSearching: boolean;
  isUpdatingSearchSettings: boolean;
  type: string;
  filters: string;
  sortBy: string;
  results: (Podcast|Episode|User)[];
  term: string;
  morePages: boolean;
  offset: number;
  redirectToSearch: boolean;
}
const DEFAULT_STATE: SearchState = {
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

export default function (state: SearchState = DEFAULT_STATE, action: SearchAction): SearchState {
  switch (action.type) {
    case ActionTypes.SET_SEARCHTYPE_START:
      return { ...state, isUpdatingSearchSettings: true };
    case ActionTypes.SET_SEARCHTYPE_SUCCESS:
      return {
        ...state, type: action.searchType, isUpdatingSearchSettings: false,
      };
    case ActionTypes.SET_SEARCHTYPE_FAILUR:
      return { ...state, isUpdatingSearchSettings: false };
    case ActionTypes.SEARCH_START:
      return { ...state, isSearching: true, redirectToSearch: action.redirect };
    case ActionTypes.SEARCH_SUCCESS:
      let results: (User | Podcast | Episode)[];
      switch (state.type) {
        case 'user':
          results = action.data.results.map((user: User) => new User(user));
          break;
        case 'episode':
          results = action.data.results.map((episode: Episode) => new Episode(episode));
          break;
        case 'podcast':
          results = action.data.results.map((podcast: Podcast) => new Podcast(podcast));
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
      return {
        ...state, isSearching: false, redirectToSearch: false, results: [], morePages: false,
      };
    default:
      return { ...state, redirectToSearch: false };
  }
}
