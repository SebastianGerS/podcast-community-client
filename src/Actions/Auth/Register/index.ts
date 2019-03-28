import { Dispatch } from 'redux';
import JWT from 'jsonwebtoken';
import config from '../../../Config/config';
import { Fetch, Response } from '../../../Helpers/Fetch';
import * as ActionTypes from './types';
import { attemptSetMessage, SetMessage } from '../../Message';
import * as Auth from '../../../Helpers/Auth';
import { validUserData, UserData } from '../Validation';
import { userLogedin, UserLoginSuccess } from '../Login';
import { setRedirect, SetRedirect } from '../../Redirect';

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
  type: ActionTypes.USER_REGISTRATION_FAILURE;
}

export const userRegistrationFailure = (): UserRegistrationFailure => (
  { type: ActionTypes.USER_REGISTRATION_FAILURE }
);

export type UserRegistrationAction = UserRegistrationStart | UserRegistrationSuccess | UserRegistrationFailure;

export const register = (token: string): Promise<Response> => Fetch('/users', 'POST', token);

type AttemptRegisterActions = UserRegistrationAction | SetMessage | UserLoginSuccess | SetRedirect;
type AttemptRegisterAction =(
  dispatch: Dispatch<AttemptRegisterActions>
) => Promise<void>;

export const attemptRegister = (data: UserData): AttemptRegisterAction => async (
  dispatch: Dispatch<AttemptRegisterActions>,
): Promise<void> => {
  if (validUserData(data)(dispatch)) {
    dispatch(startUserRegistration());
    const ttemptoken = JWT.sign(data, config.JWT_SECRET);

    const response = await register(JSON.stringify({ token: ttemptoken })).catch(error => error);

    if (response.message === 'Failed to fetch') {
      attemptSetMessage(
        {
          text: 'Unable to connect to the Thru the Ether Api at this time',
          type: 'error',
        },
      )(dispatch);
    }

    if (response.error) {
      dispatch(userRegistrationFailure());
      const text: string = response.message ? response.message : response.error.errmsg;

      attemptSetMessage({ text, type: 'warning' })(dispatch);
    }

    if (response.token) {
      Auth.setToken(response.token);
      dispatch(userRegistered());
      dispatch(setRedirect({ to: '/' }));
      const decoded = await Auth.verifytoken(response.token).catch(error => error);
      if (Auth.getToken() && decoded.user) dispatch(userLogedin(decoded.user));
    }
  }
};
