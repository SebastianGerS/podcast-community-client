import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { attemptSetMessage, SetMessage } from '../../Message';
import { attemptGetSelf, GetSelfSuccess } from '../../Auth';
import { createEvent } from '../CreateEvent';

interface ToggleFollowsStart {
  type: ActionTypes.TOGGLE_FOLLOWS_START;
}

const startToggleFollows = (): ToggleFollowsStart => ({
  type: ActionTypes.TOGGLE_FOLLOWS_START,
});

interface ToggleFollowsSuccess {
  type: ActionTypes.TOGGLE_FOLLOWS_SUCCESS;
}

const toggleFollowsSuccess = (): ToggleFollowsSuccess => ({
  type: ActionTypes.TOGGLE_FOLLOWS_SUCCESS,
});

interface ToggleFollowsFailure {
  type: ActionTypes.TOGGLE_FOLLOWS_FAILURE;
}

const toggleFollowsFailure = (): ToggleFollowsFailure => ({
  type: ActionTypes.TOGGLE_FOLLOWS_FAILURE,
});

export type ToggleFollowsAction = ToggleFollowsStart | ToggleFollowsSuccess | ToggleFollowsFailure;

type AttemptToggleFollows = (
  dispatch: Dispatch<ToggleFollowsAction | GetSelfSuccess | GetSelfSuccess | SetMessage>
) => Promise<void>;

/* eslint-disable import/prefer-default-export */
export const attemptToggleFollows = (userId: string, targetUserId: string): AttemptToggleFollows => async (
  dispatch: Dispatch<ToggleFollowsAction | GetSelfSuccess | GetSelfSuccess | SetMessage>,
): Promise<void> => {
  dispatch(startToggleFollows());

  const event = {
    target: {
      kind: 'User',
      item: targetUserId,
    },
    type: 'follows',
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
    dispatch(toggleFollowsFailure());
    attemptSetMessage({ text: response.error.errmsg, type: 'warning' })(dispatch);
  }

  if (response.event) {
    attemptGetSelf()(dispatch);

    const text = response.event.type.charAt(response.event.type.length - 1) === 'e'
      ? `Sucessfully ${response.event.type}d`
      : `Sucessfully ${response.event.type}ed`;

    attemptSetMessage({ text, type: 'success' })(dispatch);
    dispatch(toggleFollowsSuccess());
  }
};
