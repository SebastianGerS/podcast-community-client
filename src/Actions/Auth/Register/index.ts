import { Dispatch } from 'redux';
import JWT from 'jsonwebtoken';
import config from '../../../Config/config';
import { Fetch, Response } from '../../../Helpers/Fetch';
import * as ActionTypes from './types';
import { atemptSetMessage, SetMessage } from '../../Message';
import * as Auth from '../../../Helpers/Auth';
import { validUserData, UserData } from '../Validation';
import { userLogedin, UserLoginSuccess } from '../Login';

interface UserRegistrationStart {
  type: ActionTypes.USER_REGISTRATION_START;
}

export const startUserRegistration = (): UserRegistrationStart => (
  { type: ActionTypes.USER_REGISTRATION_START }
);

interface UserRegistrationSuccess {
  type: ActionTypes.USER_REGISTRATION_SUCCESS;
}

export const userRegistered = (): UserRegistrationSuccess => (
  { type: ActionTypes.USER_REGISTRATION_SUCCESS }
);

interface UserRegistrationFailure {
  type: ActionTypes.USER_REGISTRATION_FAILUR;
}

export const userRegistrationFailure = (): UserRegistrationFailure => (
  { type: ActionTypes.USER_REGISTRATION_FAILUR }
);

export type UserRegistrationAction = UserRegistrationStart | UserRegistrationSuccess | UserRegistrationFailure;

export const register = (token: string): Promise<Response> => Fetch('/users', 'POST', token);

type AtemptRegisterAction =(
  dispatch: Dispatch<UserRegistrationAction|SetMessage|UserLoginSuccess>
) => Promise<void>;

export const atemptRegister = (data: UserData): AtemptRegisterAction => async (
  dispatch: Dispatch<UserRegistrationAction|SetMessage|UserLoginSuccess>,
): Promise<void> => {
  if (validUserData(data)(dispatch)) {
    dispatch(startUserRegistration());
    const tempToken = JWT.sign(data, config.JWT_SECRET);

    const response = await register(JSON.stringify({ token: tempToken })).catch(error => error);

    if (response.message === 'Failed to fetch') {
      atemptSetMessage(
        {
          text: 'unable to connect to resource pleas check your internet conection',
          type: 'error',
        },
      )(dispatch);
    }

    if (response.error) {
      dispatch(userRegistrationFailure());
      const text: string = response.message ? response.message : response.error.errmsg;

      atemptSetMessage({ text, type: 'warning' })(dispatch);
    }

    if (response.token) {
      Auth.setToken(response.token);
      dispatch(userRegistered());
      const decoded = await Auth.verifytoken(response.token).catch(error => error);
      if (Auth.getToken() && decoded.user) dispatch(userLogedin(decoded.user));
    }
  }
};
