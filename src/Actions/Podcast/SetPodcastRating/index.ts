import * as ActionsTypes from './types';
import { Rating } from '../../../Models/Rating';

export interface PodcastRatings {
  avrageRating: number;
  episodeRating: Rating;
}

export interface SetPodcastRating extends PodcastRatings{
  type: ActionsTypes.SET_PODCAST_RATING;
}


export const setPodcastRating = ({ avrageRating, episodeRating }: PodcastRatings): SetPodcastRating => ({
  type: ActionsTypes.SET_PODCAST_RATING,
  avrageRating,
  episodeRating,
});
