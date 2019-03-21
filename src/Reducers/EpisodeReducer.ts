import * as ActionTypes from '../Actions/Episode/types';
import { EpisodeActions } from '../Actions/Episode';
import { Episode } from '../Models/Episode';

export interface EpisodeState {
  isFetching: boolean;
  episode: Episode;
}
const DEFAULT_STATE: EpisodeState = {
  isFetching: false,
  episode: new Episode(),
};

export default function (state: EpisodeState = DEFAULT_STATE, action: EpisodeActions): EpisodeState {
  switch (action.type) {
    case ActionTypes.GET_EPISODE_START:
      return {
        ...state,
        isFetching: true,
        episode: new Episode(),
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
    default:
      return { ...state };
  }
}
