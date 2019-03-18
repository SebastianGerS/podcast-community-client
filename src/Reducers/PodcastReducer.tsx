import * as ActionTypes from '../Actions/Podcast/types';
import { Podcast } from '../Models/Podcast';
import { GetTopPodcastsAction } from '../Actions/Podcast';

export interface PodcastState {
  isFetching: boolean;
  topPodcasts: Podcast[];
}
const DEFAULT_STATE: PodcastState = {
  isFetching: false,
  topPodcasts: [new Podcast()],
};

export default function (state: PodcastState = DEFAULT_STATE, action: GetTopPodcastsAction): PodcastState {
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
    default:
      return { ...state };
  }
}
