import { GetTopPodcastsAction } from './TopPodcasts';
import { GetPodcastAction } from './Podcast';
import { ResetPodcast } from './ResetPodcast';

export type PodcastActions = GetTopPodcastsAction | GetPodcastAction | ResetPodcast;

export * from './TopPodcasts';
export * from './Podcast';
export * from './ResetPodcast';
