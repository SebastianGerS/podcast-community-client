import * as ActionTypes from '../Actions/Episode/types';
import { EpisodeActions } from '../Actions/Episode';
import { Episode } from '../Models/Episode';

export interface EpisodeState {
  isFetching: boolean;
  isRating: boolean;
  isFetchingRating: boolean;
  episode: Episode;
  avrageRating: number;
}
const DEFAULT_STATE: EpisodeState = {
  isFetching: false,
  isRating: false,
  isFetchingRating: false,
  episode: new Episode(),
  avrageRating: 0,
};

export default function (state: EpisodeState = DEFAULT_STATE, action: EpisodeActions): EpisodeState {
  switch (action.type) {
    case ActionTypes.GET_EPISODE_START:
      return {
        ...state,
        isFetching: true,
        episode: new Episode(),
        avrageRating: 0,
      };
    case ActionTypes.GET_EPISODE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        episode: new Episode(action.episode),
      };
    case ActionTypes.GET_EPISODE_FAILURE:
      return {
        ...state, isFetching: false,
      };
    case ActionTypes.RATE_EPISODE_START:
      return {
        ...state,
        isRating: true,
      };
    case ActionTypes.RATE_EPISODE_SUCCESS:
      return {
        ...state,
        isRating: false,
      };
    case ActionTypes.RATE_EPISODE_FAILURE:
      return {
        ...state, isRating: false,
      };
    case ActionTypes.SET_EPISODE_RATING:
      return {
        ...state, avrageRating: action.rating,
      };
    case ActionTypes.GET_EPISODE_RATING_START:
      return { ...state, isFetchingRating: true };
    case ActionTypes.GET_EPISODE_RATING_SUCCESS:
      return {
        ...state,
        isFetchingRating: false,
        avrageRating: action.rating,
      };
    case ActionTypes.GET_EPISODE_RATING_FAILURE:
      return {
        ...state, isFetchingRating: false,
      };
    default:
      return { ...state };
  }
}
