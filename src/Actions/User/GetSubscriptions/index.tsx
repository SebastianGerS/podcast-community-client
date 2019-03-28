
import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, formatError, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { attemptGetSelf, GetSelfSuccess } from '../../Auth';
import { Podcast } from '../../../Models/Podcast';
import { Category } from '../../../Models/Category';

interface GetSubscriptionsStart {
  type: ActionTypes.GET_SUBSCRIPTIONS_START;
}

export const startGetSubscriptions = (): GetSubscriptionsStart => ({
  type: ActionTypes.GET_SUBSCRIPTIONS_START,
});

interface Subscriptions {
  subscriptions: Podcast[];
  categories: Category[];
}
interface GetSubscriptionsSuccess extends Subscriptions {
  type: ActionTypes.GET_SUBSCRIPTIONS_SUCCESS;
}

export const gotSubscriptions = ({ subscriptions, categories }: Subscriptions): GetSubscriptionsSuccess => ({
  type: ActionTypes.GET_SUBSCRIPTIONS_SUCCESS,
  subscriptions,
  categories,
});

interface GetSubscriptionsFailure {
  type: ActionTypes.GET_SUBSCRIPTIONS_FAILURE;
}

export const getSubscriptionsFailure = (): GetSubscriptionsFailure => ({
  type: ActionTypes.GET_SUBSCRIPTIONS_FAILURE,
});

export type GetSubscriptionsAction = GetSubscriptionsStart | GetSubscriptionsSuccess | GetSubscriptionsFailure;

const getSubscriptions = (userId: string): Promise<Response> => Fetch(`/users/${userId}/subscriptions`, 'GET', {});

type AttemptGetSubscriptionsAction = (
  dispatch: Dispatch<GetSubscriptionsAction | SetMessage | GetSelfSuccess>
) => Promise<void>;

export const attemptGetSubscriptions = (userId: string): AttemptGetSubscriptionsAction => async (
  dispatch: Dispatch<GetSubscriptionsAction | SetMessage | GetSelfSuccess>,
): Promise<void> => {
  dispatch(startGetSubscriptions());

  const response = await getSubscriptions(userId);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getSubscriptionsFailure());

    attemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' })(dispatch);
  }
  if (response.subscriptions) {
    dispatch(gotSubscriptions(response));
    attemptGetSelf()(dispatch);
  }
};
