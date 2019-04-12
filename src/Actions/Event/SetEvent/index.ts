import * as ActionTypes from './types';
import { Event } from '../../../Models/Event';

export interface SetEvent {
  type: ActionTypes.SET_EVENT;
  event: Event;
}

export const setEvent = (event: Event): SetEvent => ({
  type: ActionTypes.SET_EVENT,
  event,
});
