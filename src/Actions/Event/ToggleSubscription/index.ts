import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { attemptSetMessage, SetMessage } from '../../Message';
import { attemptGetSelf, GetSelfSuccess } from '../../Auth';
import { attemptGetSubscriptions, GetSubscriptionsAction } from '../../User';
import { createEvent } from '../CreateEvent';

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
  type: ActionTypes.TOGGLE_SUBSCRIPTION_FAILURE;
}

const toggleSubscriptionFailure = (): ToggleSubscriptionFailure => ({
  type: ActionTypes.TOGGLE_SUBSCRIPTION_FAILURE,
});

export type ToggleSubscriptionAction = ToggleSubscriptionStart | ToggleSubscriptionSuccess | ToggleSubscriptionFailure;

type AttemptToggleSubscription = (
  dispatch: Dispatch<ToggleSubscriptionAction | GetSelfSuccess | GetSubscriptionsAction | GetSelfSuccess | SetMessage>
) => Promise<void>;

export const attemptToggleSubscription = (userId: string, target: object): AttemptToggleSubscription => async (
  dispatch: Dispatch<ToggleSubscriptionAction | GetSelfSuccess | GetSubscriptionsAction | GetSelfSuccess | SetMessage>,
): Promise<void> => {
  dispatch(startToggleSubscription());

  const event = {
    target,
    object: {

    },
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
    dispatch(toggleSubscriptionFailure());
    attemptSetMessage({ text: response.error.errmsg, type: 'warning' })(dispatch);
  }

  if (response.event) {
    attemptGetSelf()(dispatch);
    attemptSetMessage({ text: `Sucessfully ${response.event.type}d`, type: 'success' })(dispatch);
    dispatch(subscriptionToggled());
    attemptGetSubscriptions(userId)(dispatch);
  }
};
