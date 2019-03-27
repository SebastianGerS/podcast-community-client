import { List } from 'immutable';
import * as ActionTypes from '../Actions/Search/types';
import { User } from '../Models/User';
import { Episode } from '../Models/Episode';
import { Podcast } from '../Models/Podcast';
import { SearchAction } from '../Actions/Search/index';
import { Filters } from '../Models/Filters';
import { Genre } from '../Models/Genre';


export interface SearchState {
  isSearching: boolean;
  isUpdatingSearchSettings: boolean;
  type: string;
  filters: Filters;
  sortBy: string;
  results: (Podcast|Episode|User)[];
  term: string;
  morePages: boolean;
  offset: number;
  redirectToSearch: boolean;
  genres: List<Genre>;
  languages: List<string>;
}
const DEFAULT_STATE: SearchState = {
  isSearching: false,
  isUpdatingSearchSettings: false,
  type: 'podcast',
  filters: new Filters(
    {
      genres: List(),
      field: undefined,
      language: undefined,
      len_max: '',
      len_min: '',
    },
  ),
  sortBy: '',
  results: [],
  term: '',
  morePages: false,
  offset: 0,
  redirectToSearch: false,
  genres: List(),
  languages: List(),
};

export default function (state: SearchState = DEFAULT_STATE, action: SearchAction): SearchState {
  switch (action.type) {
    case ActionTypes.SET_SEARCHTYPE_START:
      return { ...state, isUpdatingSearchSettings: true };
    case ActionTypes.SET_SEARCHTYPE_SUCCESS:
      return {
        ...state,
        type: action.searchType,
        isUpdatingSearchSettings: false,
        offset: 0,
        morePages: false,
        filters: new Filters(),
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
    case ActionTypes.SET_SEARCHFILTERS_START:
      return {
        ...state, isUpdatingSearchSettings: true,
      };
    case ActionTypes.SET_SEARCHFILTERS_SUCCESS:
      return {
        ...state,
        isUpdatingSearchSettings: false,
        filters: new Filters(action.filters),
        offset: 0,
        morePages: false,
      };
    case ActionTypes.SET_SEARCHFILTERS_FAILUR:
      return {
        ...state, isUpdatingSearchSettings: false,
      };
    case ActionTypes.FETCH_FILTERS_START:
      return {
        ...state, isUpdatingSearchSettings: true,
      };
    case ActionTypes.FETCH_FILTERS_SUCCESS:
      return {
        ...state,
        isUpdatingSearchSettings: false,
        genres: List(action.genres),
        languages: List(action.languages),
      };
    case ActionTypes.FETCH_FILTERS_FAILUR:
      return {
        ...state, isUpdatingSearchSettings: false,
      };
    default:
      return { ...state, redirectToSearch: false };
  }
}
