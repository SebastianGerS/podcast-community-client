import { Dispatch } from 'redux';
import { Fetch, Response } from '../../../Helpers/Fetch';
import * as ActionTypes from './types';
import { atemptSetMessage, SetMessage } from '../../Message';
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

export type AtemptGetSelfAction = (dispatch: Dispatch<GetSelfSuccess|SetMessage>) => Promise<void>;

export const atemptGetSelf = (): AtemptGetSelfAction => async (
  dispatch: Dispatch<GetSelfSuccess|SetMessage>,
): Promise<void> => {
  const response = await getSelf();

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    const text = response.message ? response.message : response.error.errmsg;

    atemptSetMessage({ text, type: 'warning' })(dispatch);
  }
  if (response.user) dispatch(gottSelf(response.user));
};
