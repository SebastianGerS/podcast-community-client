import * as ActionsTypes from './types';
import { Rating } from '../../../Models/Rating';

export interface SetRating {
  type: ActionsTypes.SET_RATING;
  rating: Rating;
}

export const setRating = (rating: Rating): SetRating => ({
  type: ActionsTypes.SET_RATING,
  rating,
});
