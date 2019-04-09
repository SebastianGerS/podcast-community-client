import { GetTopPodcastsAction } from './TopPodcasts';
import { GetPodcastAction } from './Podcast';
import { GetPodcastEpisodesAction } from './Episodes';
import { SetPodcastRating } from './SetPodcastRating';
import { GetPodcastRatingAction } from './GetPodcastRating';
import { GetPodcastEpisodeRatingAction } from './GetPodcastEpisodeRating';
import { GetPodcastRatingsAction } from './GetPodcastRatings';

export type PodcastActions = (
  GetTopPodcastsAction | GetPodcastAction | GetPodcastEpisodesAction | GetPodcastRatingsAction
  | SetPodcastRating | GetPodcastRatingAction | GetPodcastEpisodeRatingAction
);

export * from './TopPodcasts';
export * from './Podcast';
export * from './Episodes';
export * from './SetPodcastRating';
export * from './GetPodcastRating';
export * from './GetPodcastEpisodeRating';
export * from './GetPodcastRatings';
