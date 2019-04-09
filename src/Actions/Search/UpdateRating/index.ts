import * as ActionTypes from './types';
import { Rating } from '../../../Models/Rating';

export interface UpdateRating {
  type: ActionTypes.UPDATE_RATING;
  rating: Rating;
}

export const updateRating = (rating: Rating): UpdateRating => ({
  type: ActionTypes.UPDATE_RATING,
  rating,
});
