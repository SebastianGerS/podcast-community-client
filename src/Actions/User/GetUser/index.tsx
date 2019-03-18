
import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../../Message';
import { User } from '../../../Models/User';

interface GetUserStart {
  type: ActionTypes.GET_USER_START;
}

export const startGettingUser = (): GetUserStart => (
  { type: ActionTypes.GET_USER_START }
);

interface GetUserSuccess {
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
  type: ActionTypes.GET_USER_FAILUR;
}

export const getUserFailure = (): GetUserFailure => (
  { type: ActionTypes.GET_USER_FAILUR }
);

export type GetUserAction = GetUserStart | GetUserSuccess | GetUserFailure;

const getUser = (userId: string): Promise<Response> => Fetch(`/users/${userId}`, 'GET', {});

type AtemptGetuserAction = (dispatch: Dispatch<GetUserAction | SetMessage>) => Promise<void>;

export const atemptGetUser = (id: string): AtemptGetuserAction => async (
  dispatch: Dispatch<GetUserAction | SetMessage>,
): Promise<void> => {
  dispatch(startGettingUser());

  const response = await getUser(id).catch(error => error);

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getUserFailure());

    atemptSetMessage({ text: response.error.errmsg, type: 'info' })(dispatch);
  }

  if (response.user) dispatch(gotUser(response.user));
};