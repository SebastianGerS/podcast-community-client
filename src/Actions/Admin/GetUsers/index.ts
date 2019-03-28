import { Dispatch } from 'redux';
import * as actionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { User } from '../../../Models/User';

interface GetUsersStart {
  type: actionTypes.GET_USERS_START;
  data?: Data;
}

const startGetUsers = (): GetUsersStart => ({
  type: actionTypes.GET_USERS_START,
});

interface Data {
  results: User[];
  morePages: boolean;
  offset: number;
  next_offset: number;
}

interface GetUsersSuccess {
  type: actionTypes.GET_USERS_SUCCESS;
  data: Data;
}

const gotUsers = (data: Data): GetUsersSuccess => ({
  type: actionTypes.GET_USERS_SUCCESS,
  data,
});

interface GetUsersFailure {
  type: actionTypes.GET_USERS_FAILURE;
}

const getUsersFailure = (): GetUsersFailure => ({
  type: actionTypes.GET_USERS_FAILURE,
});

export type GetUsersAction = GetUsersStart | GetUsersSuccess | GetUsersFailure;

export interface UserSearch {
  offset: number;
  type: string;
  term: string;
}

const getUsers = (
  { offset, type, term }: UserSearch,
): Promise<Response> => Fetch(`/search?term=${term}&type=${type}&offset=${offset}`, 'GET', {});

export type AttemptGetUsersAction = (dispatch: Dispatch<GetUsersAction | SetMessage>) => Promise<void>;

export const attemptGetUsers = (data: UserSearch): AttemptGetUsersAction => async (
  dispatch: Dispatch<GetUsersAction | SetMessage>,
): Promise<void> => {
  dispatch(startGetUsers());

  const response = await getUsers(data).catch(error => error);
  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getUsersFailure());
    (attemptSetMessage({ text: response.error.errmsg, type: 'warning' }))(dispatch);
  }
  if (response.results) dispatch(gotUsers(response));
};
