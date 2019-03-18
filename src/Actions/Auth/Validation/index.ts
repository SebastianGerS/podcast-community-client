import { Dispatch } from 'redux';
import { atemptSetMessage, SetMessage } from '../../Message';
import {
  invalidEmail, invalidPassword, invalidUsername, invalidPasswordConfirmation,
} from '../../../Helpers/Validation';

type ValidateAction = (dispatch: Dispatch<SetMessage>) => boolean;

export const validUsername = (username: string): ValidateAction => (dispatch: Dispatch<SetMessage>): boolean => {
  if (invalidUsername(username)) {
    atemptSetMessage({ text: 'Please select a username', type: 'warning' })(dispatch);
    return false;
  }
  return true;
};

export const validEmail = (email: string): ValidateAction => (dispatch: Dispatch<SetMessage>): boolean => {
  if (invalidEmail(email)) {
    atemptSetMessage({ text: 'Please enter a valid email address', type: 'warning' })(dispatch);
    return false;
  }
  return true;
};

export const validPassword = (password: string): ValidateAction => (dispatch: Dispatch<SetMessage>): boolean => {
  if (invalidPassword(password)) {
    atemptSetMessage({ text: 'Passwords must be atleast 8 characters long', type: 'warning' })(dispatch);
    return false;
  }
  return true;
};

export const validPasswordConfirmation = (password: string, passwordConfirmation: string): ValidateAction => (
  dispatch: Dispatch<SetMessage>,
): boolean => {
  if (invalidPasswordConfirmation(password, passwordConfirmation)) {
    atemptSetMessage({ text: 'Passwordconfirmation does not match', type: 'warning' })(dispatch);
    return false;
  }
  return true;
};

export interface UserData {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export const validUserData = ({
  email, username, password, passwordConfirmation,
}: UserData): ValidateAction => (dispatch: Dispatch<SetMessage>): boolean => (
  validEmail(email)(dispatch)
  && validUsername(username)(dispatch)
  && validPassword(password)(dispatch)
  && validPasswordConfirmation(password, passwordConfirmation)(dispatch)
);
