import * as ActionTypes from '../Actions/Rating/types';
import { RatingActions } from '../Actions/Rating';
import { Rating } from '../Models/Rating';

export interface RatingState {
  isRating: boolean;
  ratings: Rating[];
}

const DEFAULT_STATE: RatingState = {
  isRating: false,
  ratings: [],
};

export default function (state: RatingState = DEFAULT_STATE, action: RatingActions): RatingState {
  switch (action.type) {
    case ActionTypes.RATE_EPISODE_START:
      return {
        ...state,
        isRating: true,
      };
    case ActionTypes.RATE_EPISODE_SUCCESS:
      return {
        ...state,
        isRating: false,
      };
    case ActionTypes.RATE_EPISODE_FAILURE:
      return {
        ...state, isRating: false,
      };
    case ActionTypes.SET_RATING:
      const newRating = new Rating({ itemId: action.rating.itemId, rating: +action.rating.rating });
      const previuslyRated = state.ratings.filter(rating => rating.itemId === newRating.itemId).length > 0;

      return {
        ...state,
        ratings: previuslyRated
          ? state.ratings.map((rating: Rating) => {
            if (rating.itemId === action.rating.itemId) {
              return newRating;
            }
            return rating;
          })
          : [...state.ratings, newRating],
      };
    case ActionTypes.RESET_RATINGS:
      return {
        ...state,
        ratings: [],
      };
    default:
      return { ...state };
  }
}
