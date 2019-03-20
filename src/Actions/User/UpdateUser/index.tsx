
import { Dispatch } from 'redux';
import JWT from 'jsonwebtoken';
import * as ActionTypes from './types';
import { Fetch, formatError, Response } from '../../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../../Message';
import {
  atemptGetSelf, validPassword, validPasswordConfirmation, GetSelfSuccess,
} from '../../Auth';

import config from '../../../Config/config';
import { atemptGetUser, GetUserAction } from '../GetUser';

interface UpdateUserStart {
  type: ActionTypes.UPDATE_USER_START;
}

export const startUpdateUser = (): UpdateUserStart => (
  { type: ActionTypes.UPDATE_USER_START }
);

interface UpdateUserSuccess {
  type: ActionTypes.UPDATE_USER_SUCCESS;
}

export const UserUpdated = (): UpdateUserSuccess => (
  {
    type: ActionTypes.UPDATE_USER_SUCCESS,
  }
);

interface UpdateUserFailure {
  type: ActionTypes.UPDATE_USER_FAILUR;
}

export const userUpdateFailure = (): UpdateUserFailure => (
  { type: ActionTypes.UPDATE_USER_FAILUR }
);

export type UpdateUserAction = UpdateUserStart | UpdateUserSuccess | UpdateUserFailure;

const updateUser = (body: object): Promise<Response> => Fetch('/users', 'PUT', body);

interface UpdateUserData {
  password?: string;
  passwordConfirmation?: string;
}

type AtemptUpdateUserAction = (
  dispatch: Dispatch<UpdateUserAction | SetMessage | GetUserAction | GetSelfSuccess>
) => Promise<void>;

export const atemptUpdateUser = (_id: string, data: UpdateUserData): AtemptUpdateUserAction => async (
  dispatch: Dispatch<UpdateUserAction | SetMessage | GetUserAction | GetSelfSuccess>,
): Promise<void> => {
  let dataIsValid = true;
  let body = data;

  if (data.password && data.passwordConfirmation) {
    dataIsValid = validPassword(data.password)(dispatch)
    && validPasswordConfirmation(data.password, data.passwordConfirmation)(dispatch);

    body = { password: JWT.sign(data.password, config.JWT_SECRET) };
  }

  if (dataIsValid) {
    dispatch(startUpdateUser());

    const response = await updateUser(body).catch(error => error);

    if (response.message === 'Failed to fetch') {
      atemptSetMessage(
        {
          text: 'Unable to connect to the Thru the Ether Api at this time',
          type: 'error',
        },
      )(dispatch);
    }

    if (response.error) {
      dispatch(userUpdateFailure());

      atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' })(dispatch);
    }

    if (response.info) {
      dispatch(UserUpdated());
      atemptGetUser(_id)(dispatch);
      atemptGetSelf()(dispatch);
      atemptSetMessage({ text: response.info, type: 'success' })(dispatch);
    }
  }
};
