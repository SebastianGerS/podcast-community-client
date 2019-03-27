import * as ActionTypes from '../Actions/Event/types';
import { EventActions } from '../Actions/Event';

export interface EventState {
  isToggelingSubscription: boolean;
  isCreatingEvent: boolean;
  isToggelingFollows: boolean;
}

const DEFAULT_STATE: EventState = {
  isToggelingSubscription: false,
  isToggelingFollows: false,
  isCreatingEvent: false,
};

export default function (state: EventState = DEFAULT_STATE, action: EventActions): EventState {
  switch (action.type) {
    case ActionTypes.TOGGLE_SUBSCRIPTION_START:
      return {
        ...state, isToggelingSubscription: true, isCreatingEvent: true,
      };
    case ActionTypes.TOGGLE_SUBSCRIPTION_SUCCESS:
      return {
        ...state, isToggelingSubscription: false, isCreatingEvent: false,
      };
    case ActionTypes.TOGGLE_SUBSCRIPTION_FAILURE:
      return {
        ...state, isToggelingSubscription: false, isCreatingEvent: false,
      };
    case ActionTypes.TOGGLE_FOLLOWS_START:
      return {
        ...state, isToggelingFollows: true, isCreatingEvent: true,
      };
    case ActionTypes.TOGGLE_FOLLOWS_SUCCESS:
      return {
        ...state, isToggelingFollows: false, isCreatingEvent: false,
      };
    case ActionTypes.TOGGLE_FOLLOWS_FAILURE:
      return {
        ...state, isToggelingFollows: false, isCreatingEvent: false,
      };
    default:
      return { ...state };
  }
}
