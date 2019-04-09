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
        offset: 0,
        morePages: false,
      };
    case ActionTypes.GET_PODCAST_SUCCESS:
      return {
        ...state,
        isFetchingPodcast: false,
        podcast: new Podcast(action.podcast),
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
    case ActionTypes.GET_PODCAST_RATING_START:
      return { ...state, isFetchingRating: true };
    case ActionTypes.GET_PODCAST_RATING_SUCCESS:
      return {
        ...state,
        isFetchingRating: false,
        avrageRating: action.rating,
      };
    case ActionTypes.GET_PODCAST_RATING_FAILURE:
      return {
        ...state, isFetchingRating: false,
      };
    case ActionTypes.GET_PODCAST_RATINGS_START:
      return { ...state, isFetchingRatings: true };
    case ActionTypes.GET_PODCAST_RATINGS_SUCCESS:
      return {
        ...state,
        isFetchingRatings: false,
        episodeRatings: action.episodeRatings.map((rating: Rating) => new Rating(rating)),
        avrageRating: action.avrageRating,
      };
    case ActionTypes.GET_PODCAST_RATINGS_FAILURE:
      return {
        ...state, isFetchingRatings: false,
      };
    default:
      return { ...state };
  }
}
