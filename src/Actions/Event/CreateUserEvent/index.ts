import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { attemptSetMessage, SetMessage } from '../../Message';
import { attemptGetSelf, GetSelfSuccess } from '../../Auth';
import { createEvent } from '../CreateEvent';
import { Event } from '../../../Models/Event';

interface CreateUserEventStart {
  type: ActionTypes.CREATE_USER_EVENT_START;
  eventTargetUserId: string;
}

const startCreateUserEvent = (eventTargetUserId: string): CreateUserEventStart => ({
  type: ActionTypes.CREATE_USER_EVENT_START,
  eventTargetUserId,
});

interface CreateUserEventSuccess {
  type: ActionTypes.CREATE_USER_EVENT_SUCCESS;
  event: Event;
}

const createUserEventSuccess = (event: Event): CreateUserEventSuccess => ({
  type: ActionTypes.CREATE_USER_EVENT_SUCCESS,
  event,
});

interface CreateUserEventFailure {
  type: ActionTypes.CREATE_USER_EVENT_FAILURE;
}

const CreateUserEventFailure = (): CreateUserEventFailure => ({
  type: ActionTypes.CREATE_USER_EVENT_FAILURE,
});

export type CreateUserEventAction = (
  CreateUserEventStart | CreateUserEventSuccess | CreateUserEventFailure
);

export type CreateUserEventActions = CreateUserEventAction | GetSelfSuccess | SetMessage;

type AttemptCreateUserEvent = (dispatch: Dispatch<CreateUserEventActions>) => Promise<void>;

export const attemptCreateUserEvent = (
  eventType: string, targetUserId: string, object: object = {},
): AttemptCreateUserEvent => async (
  dispatch: Dispatch<CreateUserEventActions>,
): Promise<void> => {
  dispatch(startCreateUserEvent(targetUserId));

  const event = {
    target: {
      kind: 'User',
      item: targetUserId,
    },
    type: eventType,
    object,
  };

  const response = await createEvent(event).catch(error => error);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(CreateUserEventFailure());
    attemptSetMessage({ text: response.error.errmsg, type: 'warning' })(dispatch);
  }

  if (response.event) {
    attemptGetSelf()(dispatch);

    const text = response.event.type.charAt(response.event.type.length - 1) === 'e'
      ? `Sucessfully ${response.event.type}d`
      : `Sucessfully ${response.event.type}ed`;

    attemptSetMessage({ text, type: 'success' })(dispatch);
    dispatch(createUserEventSuccess(response.event));
  }
};

export const attemptConfirmFollowRequest = (
  (targetUserId: string): AttemptCreateUserEvent => attemptCreateUserEvent('confirm', targetUserId)
);

export const attemptRejectFollowRequest = (
  (targetUserId: string): AttemptCreateUserEvent => attemptCreateUserEvent('reject', targetUserId)
);

export const attemptToggleFollows = (
  (targetUserId: string): AttemptCreateUserEvent => attemptCreateUserEvent('follows', targetUserId)
);

export const attemptRemoveFollower = (
  (targetUserId: string): AttemptCreateUserEvent => attemptCreateUserEvent('remove', targetUserId)
);
