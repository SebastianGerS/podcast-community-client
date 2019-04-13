import * as ActionTypes from '../Actions/Event/types';
import { EventActions } from '../Actions/Event';
import { Event } from '../Models/Event';

export interface EventState {
  isToggelingSubscription: boolean;
  isCreatingEvent: boolean;
  isCreatingUserEvent: boolean;
  isFetchingEvents: boolean;
  eventTargetUserId: string;
  createdEvent: Event;
  events: Event[];
  morePages: boolean;
  nextOffset: number;
}

const DEFAULT_STATE: EventState = {
  isToggelingSubscription: false,
  isCreatingUserEvent: false,
  isCreatingEvent: false,
  isFetchingEvents: true,
  eventTargetUserId: '',
  createdEvent: new Event(),
  events: [],
  morePages: false,
  nextOffset: 0,
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
        ...state,
        isCreatingUserEvent: false,
        isCreatingEvent: false,
        eventTargetUserId: '',
        createdEvent: action.event,
      };
    case ActionTypes.CREATE_USER_EVENT_FAILURE:
      return {
        ...state, isCreatingUserEvent: false, isCreatingEvent: false, eventTargetUserId: '',
      };
    case ActionTypes.GET_FOLLOWING_EVENTS_START:
      return {
        ...state,
        isFetchingEvents: true,
      };
    case ActionTypes.GET_FOLLOWING_EVENTS_SUCCESS:
      return {
        ...state,
        events: state.events.length === 0
          ? action.events.map(event => new Event(event))
          : [...state.events, ...action.events.map(event => new Event(event))],
        nextOffset: action.next_offset,
        morePages: action.morePages,
        isFetchingEvents: false,

      };
    case ActionTypes.GET_FOLLOWING_EVENTS_FAILURE:
      return {
        ...state,
        isFetchingEvents: false,
      };
    case ActionTypes.SET_EVENT:
      return {
        ...state,
        events: [new Event(action.event), ...state.events],
      };
    default:
      return { ...state };
  }
}
