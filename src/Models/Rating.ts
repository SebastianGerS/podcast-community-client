import { Record } from 'immutable';

export interface Rating {
  episodeId?: string | StringConstructor;
  podcastId?: string | StringConstructor;
  rating: number | NumberConstructor;
}

export const Rating = Record<Rating>({
  episodeId: String,
  podcastId: String,
  rating: Number,
});
