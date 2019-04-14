import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { attemptSetMessage, SetMessage } from '../../Message';
import { Event } from '../../../Models/Event';
import { Fetch, Response } from '../../../Helpers/Fetch';

interface GetFollowingEventsStart {
  type: ActionTypes.GET_FOLLOWING_EVENTS_START;
}

const startGetFollowingEvents = (): GetFollowingEventsStart => ({
  type: ActionTypes.GET_FOLLOWING_EVENTS_START,
});

interface FollowingEventsData {
  events: Event[];
  next_offset: number;
  morePages: boolean;
}
interface GetFollowingEventsSuccess extends FollowingEventsData {
  type: ActionTypes.GET_FOLLOWING_EVENTS_SUCCESS;
}

const GetFollowingEventsSuccess = (data: FollowingEventsData): GetFollowingEventsSuccess => ({
  type: ActionTypes.GET_FOLLOWING_EVENTS_SUCCESS,
  events: data.events,
  next_offset: data.next_offset,
  morePages: data.morePages,
});

interface GetFollowingEventsFailure {
  type: ActionTypes.GET_FOLLOWING_EVENTS_FAILURE;
}

const GetFollowingEventsFailure = (): GetFollowingEventsFailure => ({
  type: ActionTypes.GET_FOLLOWING_EVENTS_FAILURE,
});

const getFollowingEvents = (offset: number): Promise<Response> => Fetch(`/events?offset=${offset}`, 'GET', {});

export type GetFollowingEventsAction = (
  GetFollowingEventsStart | GetFollowingEventsSuccess | GetFollowingEventsFailure
);

export type GetFollowingEventsActions = GetFollowingEventsAction | SetMessage;

type AttemptGetFollowingEvents = (dispatch: Dispatch<GetFollowingEventsActions>) => Promise<void>;

export const attemptGetFollowingEvents = (offset: number): AttemptGetFollowingEvents => async (
  dispatch: Dispatch<GetFollowingEventsActions>,
): Promise<void> => {
  dispatch(startGetFollowingEvents());

  const response = await getFollowingEvents(offset).catch(error => error);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(GetFollowingEventsFailure());
  }

  if (response.events) {
    dispatch(GetFollowingEventsSuccess(response));
  }
};
