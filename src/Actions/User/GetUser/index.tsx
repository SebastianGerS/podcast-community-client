
import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { User } from '../../../Models/User';

interface GetUserStart {
  type: ActionTypes.GET_USER_START;
}

export const startGettingUser = (): GetUserStart => (
  { type: ActionTypes.GET_USER_START }
);

export interface GetUserSuccess {
  type: ActionTypes.GET_USER_SUCCESS;
  user: User;
}

export const gotUser = (user: User): GetUserSuccess => (
  {
    type: ActionTypes.GET_USER_SUCCESS,
    user,
  }
);

interface GetUserFailure {
  type: ActionTypes.GET_USER_FAILURE;
}

export const getUserFailure = (): GetUserFailure => (
  { type: ActionTypes.GET_USER_FAILURE }
);

export type GetUserAction = GetUserStart | GetUserSuccess | GetUserFailure;

const getUser = (userId: string): Promise<Response> => Fetch(`/users/${userId}`, 'GET', {});

type AttemptGetuserAction = (dispatch: Dispatch<GetUserAction | SetMessage>) => Promise<void>;

export const attemptGetUser = (id: string): AttemptGetuserAction => async (
  dispatch: Dispatch<GetUserAction | SetMessage>,
): Promise<void> => {
  dispatch(startGettingUser());

  const response = await getUser(id).catch(error => error);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getUserFailure());

    attemptSetMessage({ text: response.error.errmsg, type: 'info' })(dispatch);
  }

  if (response.user) dispatch(gotUser(response.user));
};
