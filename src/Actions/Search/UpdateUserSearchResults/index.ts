import { UPDATE_USER_SEARCH_RESULTS } from './types';
import { User } from '../../../Models/User';

export interface UpdateUserSearchResults {
  type: UPDATE_USER_SEARCH_RESULTS;
  user: User;
}

export const updateUserSearchResults = (user: User): UpdateUserSearchResults => ({
  type: UPDATE_USER_SEARCH_RESULTS,
  user,
});
