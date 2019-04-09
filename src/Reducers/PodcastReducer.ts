import * as ActionTypes from '../Actions/Podcast/types';
import { Podcast } from '../Models/Podcast';
import { PodcastActions } from '../Actions/Podcast';
import { Episode } from '../Models/Episode';
import { Rating } from '../Models/Rating';

export interface PodcastState {
  isFetchingPodcast: boolean;
  isFetchingTopPodcasts: boolean;
  isFetchingEpisodes: boolean;
  isFetchingRating: boolean;
  isFetchingRatings: boolean;
  topPodcasts: Podcast[];
  podcast: Podcast;
  episodes: Episode[];
  episodeRatings: Rating[];
  offset: number;
  morePages: boolean;
  avrageRating: number;
}
const DEFAULT_STATE: PodcastState = {
  isFetchingPodcast: false,
  isFetchingTopPodcasts: false,
  isFetchingEpisodes: false,
  isFetchingRating: false,
  isFetchingRatings: false,
  topPodcasts: [new Podcast()],
  podcast: new Podcast(),
  episodes: [],
  episodeRatings: [],
  offset: 0,
  morePages: false,
  avrageRating: 0,
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
        isFetchingPodcast: true,
        podcast: new Podcast(),
        episodes: [],
        episodeRatings: [],
        avrageRating: 0,
        offset: 0,
        morePages: false,
      };
    case ActionTypes.GET_PODCAST_SUCCESS:
      console.log(action);
      return {
        ...state,
        isFetchingPodcast: false,
        podcast: new Podcast(action.podcast),
        avrageRating: action.ratings.avrageRating,
        episodeRatings: action.ratings.episodeRatings,
      };
    case ActionTypes.GET_PODCAST_FAILURE:
      return {
        ...state, isFetchingPodcast: false,
      };
    case ActionTypes.GET_PODCAST_EPISODES_START:
      return { ...state, isFetchingEpisodes: true };
    case ActionTypes.GET_PODCAST_EPISODES_SUCCESS:
      return {
        ...state,
        isFetchingEpisodes: false,
        episodes: state.offset === 0 ? action.data.results.map((episode: Episode) => new Episode(episode))
          : [...state.episodes, ...action.data.results.map((episode: Episode) => new Episode(episode))],
        offset: action.data.next_offset,
        morePages: action.data.morePages,
      };
    case ActionTypes.GET_PODCAST_EPISODES_FAILURE:
      return {
        ...state, isFetchingEpisodes: false,
      };
    case ActionTypes.SET_PODCAST_RATING:
      const newRating = new Rating({ episodeId: action.episodeRating.episodeId, rating: +action.episodeRating.rating });
      const previuslyRated = state.episodeRatings.filter(rating => rating.episodeId === newRating.episodeId).length > 0;

      return {
        ...state,
        avrageRating: action.avrageRating,
        episodeRatings: previuslyRated
          ? [...state.episodeRatings.map((episodeRating: Rating) => {
            if (episodeRating.episodeId === action.episodeRating.episodeId) {
              return new Rating(newRating);
            }
            return episodeRating;
          })]
          : [...state.episodeRatings, newRating],
      };
    default:
      return { ...state };
  }
}
