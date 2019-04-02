import * as ActionTypes from '../Actions/Event/types';
import { EventActions } from '../Actions/Event';
import { Event } from '../Models/Event';

export interface EventState {
  isToggelingSubscription: boolean;
  isCreatingEvent: boolean;
  isCreatingUserEvent: boolean;
  eventTargetUserId: string;
  createdEvent: Event;
}

const DEFAULT_STATE: EventState = {
  isToggelingSubscription: false,
  isCreatingUserEvent: false,
  isCreatingEvent: false,
  eventTargetUserId: '',
  createdEvent: new Event(),
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
    case ActionTypes.CREATE_USER_EVENT_START:
      return {
        ...state,
        isCreatingUserEvent: true,
        isCreatingEvent: true,
        eventTargetUserId: action.eventTargetUserId,
        createdEvent: new Event(),
      };
    case ActionTypes.CREATE_USER_EVENT_SUCCESS:
      return {
        ...state, isCreatingUserEvent: false, isCreatingEvent: false, eventTargetUserId: '', createdEvent: action.event,
      };
    case ActionTypes.CREATE_USER_EVENT_FAILURE:
      return {
        ...state, isCreatingUserEvent: false, isCreatingEvent: false, eventTargetUserId: '',
      };
    default:
      return { ...state };
  }
}
