import * as ActionTypes from '../Actions/Podcast/types';
import { Podcast } from '../Models/Podcast';
import { PodcastActions } from '../Actions/Podcast';

export interface PodcastState {
  isFetching: boolean;
  topPodcasts: Podcast[];
  podcast: Podcast;
}
const DEFAULT_STATE: PodcastState = {
  isFetching: false,
  topPodcasts: [new Podcast()],
  podcast: new Podcast(),
};

export default function (state: PodcastState = DEFAULT_STATE, action: PodcastActions): PodcastState {
  switch (action.type) {
    case ActionTypes.GET_TOP_PODCASTS_START:
      return { ...state, isFetching: true };
    case ActionTypes.GET_TOP_PODCASTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        topPodcasts: action.podcasts.map(podcast => new Podcast(podcast)),
      };
    case ActionTypes.GET_TOP_PODCASTS_FAILURE:
      return {
        ...state, isFetching: false,
      };
    case ActionTypes.GET_PODCAST_START:
      return { ...state, isFetching: true };
    case ActionTypes.GET_PODCAST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        podcast: new Podcast(action.podcast),
      };
    case ActionTypes.GET_PODCAST_FAILURE:
      return {
        ...state, isFetching: false,
      };
    default:
      return { ...state };
  }
}
