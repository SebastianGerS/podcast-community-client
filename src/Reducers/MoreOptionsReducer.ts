import * as ActionTypes from '../Actions/MoreOptions/types';
import { Episode } from '../Models/Episode';
import { Podcast } from '../Models/Podcast';
import { MoreOptionsActions } from '../Actions/MoreOptions';

export interface MoreOptionsState {
  episode: Episode | undefined;
  podcast: Podcast | undefined;
}
const DEFAULT_STATE: MoreOptionsState = {
  episode: undefined,
  podcast: undefined,
};

export default function (state: MoreOptionsState = DEFAULT_STATE, action: MoreOptionsActions): MoreOptionsState {
  switch (action.type) {
    case ActionTypes.SET_EPISODE:
      return {
        ...state,
        podcast: undefined,
        episode: new Episode(action.episode),
      };
    case ActionTypes.SET_PODCAST:
      return {
        ...state,
        episode: undefined,
        podcast: new Podcast(action.podcast),
      };
    default:
      return { ...state };
  }
}
