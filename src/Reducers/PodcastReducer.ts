import * as ActionTypes from '../Actions/Podcast/types';
import { Podcast } from '../Models/Podcast';
import { PodcastActions } from '../Actions/Podcast';
import { Episode } from '../Models/Episode';

export interface PodcastState {
  isFetchingPodcast: boolean;
  isFetchingTopPodcasts: boolean;
  isFetchingEpisodes: boolean;
  topPodcasts: Podcast[];
  podcast: Podcast;
  episodes: Episode[];
  offset: number;
  nextOffset: number | undefined;
  morePages: boolean;
}
const DEFAULT_STATE: PodcastState = {
  isFetchingPodcast: false,
  isFetchingTopPodcasts: false,
  isFetchingEpisodes: false,
  topPodcasts: [new Podcast()],
  podcast: new Podcast(),
  episodes: [],
  offset: 0,
  nextOffset: undefined,
  morePages: false,
};

export default function (state: PodcastState = DEFAULT_STATE, action: PodcastActions): PodcastState {
  switch (action.type) {
    case ActionTypes.GET_TOP_PODCASTS_START:
      return { ...state, isFetchingTopPodcasts: true };
    case ActionTypes.GET_TOP_PODCASTS_SUCCESS:
      return {
        ...state,
        isFetchingTopPodcasts: false,
        topPodcasts: action.podcasts.map(podcast => new Podcast(podcast)),
      };
    case ActionTypes.GET_TOP_PODCASTS_FAILURE:
      return {
        ...state, isFetchingTopPodcasts: false,
      };
    case ActionTypes.GET_PODCAST_START:
      return {
        ...state,
        isFetchingPodcast: action.isFetchingPodcast,
        isFetchingEpisodes: true,
      };
    case ActionTypes.GET_PODCAST_SUCCESS:
      return {
        ...state,
        isFetchingPodcast: false,
        isFetchingEpisodes: false,
        podcast: action.podcast ? new Podcast(action.podcast) : state.podcast,
        episodes: !state.nextOffset ? action.episodes.map((episode: Episode) => new Episode(episode))
          : [...state.episodes, ...action.episodes.map((episode: Episode) => new Episode(episode))],
        nextOffset: action.nextOffset,
        morePages: action.morePages,
      };
    case ActionTypes.GET_PODCAST_FAILURE:
      return {
        ...state, isFetchingPodcast: false, isFetchingEpisodes: false,
      };
    case ActionTypes.RESET_PODCAST: {
      return {
        ...state,
        podcast: new Podcast(),
        episodes: [],
        nextOffset: undefined,
        morePages: false,
      };
    }
    default:
      return { ...state };
  }
}
