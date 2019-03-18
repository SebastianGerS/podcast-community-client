import { Dispatch } from 'redux';
import * as actionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../../Message';
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
  type: actionTypes.GET_USERS_FAILUR;
}

const getUsersFailure = (): GetUsersFailure => ({
  type: actionTypes.GET_USERS_FAILUR,
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

export type AtemptGetUsersAction = (dispatch: Dispatch<GetUsersAction | SetMessage>) => Promise<void>;

export const atemptGetUsers = (data: UserSearch): AtemptGetUsersAction => async (
  dispatch: Dispatch<GetUsersAction | SetMessage>,
): Promise<void> => {
  dispatch(startGetUsers());

  const response = await getUsers(data).catch(error => error);
  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getUsersFailure());
    (atemptSetMessage({ text: response.error.errmsg, type: 'warning' }))(dispatch);
  }
  if (response.results) dispatch(gotUsers(response));
};
