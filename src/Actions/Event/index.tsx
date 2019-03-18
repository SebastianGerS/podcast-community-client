import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../Message';
import { atemptGetSelf, GetSelfSuccess } from '../Auth';
import { atemptGetSubscriptions, GetSubscriptionsAction } from '../User';

interface ToggleSubscriptionStart {
  type: ActionTypes.TOGGLE_SUBSCRIPTION_START;
}

const startToggleSubscription = (): ToggleSubscriptionStart => ({
  type: ActionTypes.TOGGLE_SUBSCRIPTION_START,
});

interface ToggleSubscriptionSuccess {
  type: ActionTypes.TOGGLE_SUBSCRIPTION_SUCCESS;
}

const subscriptionToggled = (): ToggleSubscriptionSuccess => ({
  type: ActionTypes.TOGGLE_SUBSCRIPTION_SUCCESS,
});

interface ToggleSubscriptionFailure {
  type: ActionTypes.TOGGLE_SUBSCRIPTION_FAILUR;
}

const toggleSubscriptionFailure = (): ToggleSubscriptionFailure => ({
  type: ActionTypes.TOGGLE_SUBSCRIPTION_FAILUR,
});

export type ToggleSubscriptionAction = ToggleSubscriptionStart | ToggleSubscriptionSuccess | ToggleSubscriptionFailure;

const createEvent = (body: object): Promise<Response> => Fetch('/events', 'POST', body);

type AtemptToggleSubscription = (
  dispatch: Dispatch<ToggleSubscriptionAction | GetSelfSuccess | GetSubscriptionsAction | GetSelfSuccess | SetMessage>
) => Promise<void>;

/* eslint-disable import/prefer-default-export */
export const atemptToggleSubscription = (userId: string, podcastId: string): AtemptToggleSubscription => async (
  dispatch: Dispatch<ToggleSubscriptionAction | GetSelfSuccess | GetSubscriptionsAction | GetSelfSuccess | SetMessage>,
): Promise<void> => {
  dispatch(startToggleSubscription());

  const event = {
    target: {
      kind: 'Podcast',
      item: podcastId,
    },
  };

  const response = await createEvent(event).catch(error => error);

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(toggleSubscriptionFailure());
    atemptSetMessage({ text: response.error.errmsg, type: 'warning' })(dispatch);
  }

  if (response.event) {
    atemptGetSelf()(dispatch);
    atemptSetMessage({ text: `Sucessfully ${response.event.type}d`, type: 'success' })(dispatch);
    dispatch(subscriptionToggled());
    atemptGetSubscriptions(userId)(dispatch);
  }
};

export type EventActions = ToggleSubscriptionAction;
