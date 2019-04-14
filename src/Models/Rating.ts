import { Record } from 'immutable';

export interface Rating {
  itemId: string | StringConstructor;
  rating: number | NumberConstructor;
}

export const Rating = Record<Rating>({
  itemId: String,
  rating: Number,
});
