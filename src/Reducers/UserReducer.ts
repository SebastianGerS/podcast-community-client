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
  followers: User[];
  following: User[];
  requests: User[];
  isFetchingFollows: boolean;
}

const DEFAULT_STATE: UserState = {
  isUpdating: false,
  user: new User(),
  isFetchingSubscriptions: false,
  subscriptions: [],
  categories: [],
  followers: [],
  following: [],
  requests: [],
  isFetchingFollows: false,
};

export default function (state: UserState = DEFAULT_STATE, action: UserActions): UserState {
  switch (action.type) {
    case ActionTypes.GET_USER_START:
      return { ...state, isUpdating: true };
    case ActionTypes.GET_USER_SUCCESS:
      return {
        ...state, isUpdating: false, user: new User(action.user),
      };
    case ActionTypes.GET_USER_FAILURE:
      return { ...state, isUpdating: false };
    case ActionTypes.UPDATE_USER_START:
      return { ...state, isUpdating: true };
    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state, isUpdating: false,
      };
    case ActionTypes.UPDATE_USER_FAILURE:
      return { ...state, isUpdating: false };
    case ActionTypes.GET_SUBSCRIPTIONS_START:
      return { ...state, isFetchingSubscriptions: true };
    case ActionTypes.GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        isFetchingSubscriptions: false,
        subscriptions: [...action.subscriptions.map((subscription: Podcast) => new Podcast(subscription))],
        categories: [...action.categories.map((category: Category) => new Category(category))],
      };
    case ActionTypes.GET_SUBSCRIPTIONS_FAILURE:
      return { ...state, isFetchingSubscriptions: false };
    case ActionTypes.GET_FOLLOWS_START:
      return { ...state, isFetchingFollows: true };
    case ActionTypes.GET_FOLLOWS_SUCCESS:
      return {
        ...state,
        isFetchingFollows: false,
        followers: action.followers.length !== 0
          ? action.followers.map((follower: User) => new User(follower))
          : [],
        following: action.following.length !== 0
          ? action.following.map((follow: User) => new User(follow))
          : [],
        requests: action.requests.length !== 0
          ? action.requests.map((request: User) => new User(request))
          : [],
      };
    case ActionTypes.GET_FOLLOWS_FAILURE:
      return { ...state, isFetchingFollows: false };
    case ActionTypes.CREATE_CATEGORY_START:
      return { ...state, isUpdating: true };
    case ActionTypes.CREATE_CATEGORY_SUCCESS:
      return { ...state, isUpdating: false };
    case ActionTypes.CREATE_CATEGORY_FAILURE:
      return { ...state, isUpdating: false };
    case ActionTypes.DELETE_SELF_START:
      return { ...state, isUpdating: true };
    case ActionTypes.DELETE_SELF_SUCCESS:
      return { ...state, isUpdating: false };
    case ActionTypes.DELETE_SELF_FAILURE:
      return { ...state, isUpdating: false };
    case ActionTypes.UPDATE_CATEGORY_START:
      return { ...state, isUpdating: true };
    case ActionTypes.UPDATE_CATEGORY_SUCCESS:
      return { ...state, isUpdating: false };
    case ActionTypes.UPDATE_CATEGORY_FAILURE:
      return { ...state, isUpdating: false };
    case ActionTypes.DELETE_CATEGORY_START:
      return { ...state, isUpdating: true };
    case ActionTypes.DELETE_CATEGORY_SUCCESS:
      return { ...state, isUpdating: false };
    case ActionTypes.DELETE_CATEGORY_FAILURE:
      return { ...state, isUpdating: false };
    default:
      return { ...state };
  }
}
