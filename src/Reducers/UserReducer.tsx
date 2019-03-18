import * as ActionTypes from '../Actions/User/types';
import { User } from '../Models/User';
import { Category } from '../Models/Category';
import { Podcast } from '../Models/Podcast';
import { UserActions } from '../Actions/User';

export interface UserState {
  isUpdating: boolean;
  user: User;
  isFetchingSubscriptions: boolean;
  subscriptions: Podcast[];
  categories: Category[];
}

const DEFAULT_STATE: UserState = {
  isUpdating: false,
  user: new User(),
  isFetchingSubscriptions: false,
  subscriptions: [new Podcast()],
  categories: [new Category()],
};

export default function (state: UserState = DEFAULT_STATE, action: UserActions): UserState {
  switch (action.type) {
    case ActionTypes.GET_USER_START:
      return { ...state, isUpdating: true };
    case ActionTypes.GET_USER_SUCCESS:
      return {
        ...state, isUpdating: false, user: new User(action.user),
      };
    case ActionTypes.GET_USER_FAILUR:
      return { ...state, isUpdating: false };
    case ActionTypes.UPDATE_USER_START:
      return { ...state, isUpdating: true };
    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state, isUpdating: false,
      };
    case ActionTypes.UPDATE_USER_FAILUR:
      return { ...state, isUpdating: false };
    case ActionTypes.GET_SUBSCRIPTIONS_START:
      return { ...state, isFetchingSubscriptions: true };
    case ActionTypes.GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        isFetchingSubscriptions: false,
        subscriptions: action.subscriptions.length !== 0
          ? action.subscriptions.map((subscription: Podcast) => new Podcast(subscription))
          : [new Podcast()],
        categories: action.categories.length !== 0
          ? action.categories.map((category: Category) => new Category(category))
          : [new Category()],
      };
    case ActionTypes.GET_SUBSCRIPTIONS_FAILUR:
      return { ...state, isFetchingSubscriptions: false };
    case ActionTypes.CREATE_CATEGORY_START:
      return { ...state, isUpdating: true };
    case ActionTypes.CREATE_CATEGORY_SUCCESS:
      return { ...state, isUpdating: false };
    case ActionTypes.CREATE_CATEGORY_FAILUR:
      return { ...state, isUpdating: false };
    case ActionTypes.DELETE_SELF_START:
      return { ...state, isUpdating: true };
    case ActionTypes.DELETE_SELF_SUCCESS:
      return { ...state, isUpdating: false };
    case ActionTypes.DELETE_SELF_FAILUR:
      return { ...state, isUpdating: false };
    case ActionTypes.UPDATE_CATEGORY_START:
      return { ...state, isUpdating: true };
    case ActionTypes.UPDATE_CATEGORY_SUCCESS:
      return { ...state, isUpdating: false };
    case ActionTypes.UPDATE_CATEGORY_FAILUR:
      return { ...state, isUpdating: false };
    case ActionTypes.DELETE_CATEGORY_START:
      return { ...state, isUpdating: true };
    case ActionTypes.DELETE_CATEGORY_SUCCESS:
      return { ...state, isUpdating: false };
    case ActionTypes.DELETE_CATEGORY_FAILUR:
      return { ...state, isUpdating: false };
    default:
      return { ...state };
  }
}
