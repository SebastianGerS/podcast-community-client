import { GetTopPodcastsAction } from './TopPodcasts';
import { GetPodcastAction } from './Podcast';
import { GetPodcastEpisodesAction } from './Episodes';
import { SetPodcastRating } from './SetPodcastRating';

export type PodcastActions = (
  GetTopPodcastsAction | GetPodcastAction | GetPodcastEpisodesAction | SetPodcastRating
);

export * from './TopPodcasts';
export * from './Podcast';
export * from './Episodes';
export * from './SetPodcastRating';
