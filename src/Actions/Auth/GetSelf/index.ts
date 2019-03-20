import { Dispatch } from 'redux';
import { Fetch, Response } from '../../../Helpers/Fetch';
import * as ActionTypes from './types';
import { attemptSetMessage, SetMessage } from '../../Message';
import { User } from '../../../Models/User';

export interface GetSelfSuccess {
  type: ActionTypes.GET_SELF_SUCCESS;
  user: User;
}

export const gottSelf = (user: User): GetSelfSuccess => ({
  type: ActionTypes.GET_SELF_SUCCESS,
  user,
});

export const getSelf = (): Promise<Response> => Fetch('/me', 'GET', {});

export type AttemptGetSelfAction = (dispatch: Dispatch<GetSelfSuccess|SetMessage>) => Promise<void>;

export const attemptGetSelf = (): AttemptGetSelfAction => async (
  dispatch: Dispatch<GetSelfSuccess|SetMessage>,
): Promise<void> => {
  const response = await getSelf();

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    const text = response.message ? response.message : response.error.errmsg;

    attemptSetMessage({ text, type: 'warning' })(dispatch);
  }
  if (response.user) dispatch(gottSelf(response.user));
};
