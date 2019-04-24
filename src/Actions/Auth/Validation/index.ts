import { Dispatch } from 'redux';
import { attemptSetMessage, SetMessage } from '../../Message';
import {
  invalidEmail, invalidPassword, invalidUsername, invalidPasswordConfirmation,
} from '../../../Helpers/Validation';
import { isImage } from '../../../Helpers/Utils';

export type ValidateAction = (dispatch: Dispatch<SetMessage>) => boolean;

export const validUsername = (username: string): ValidateAction => (dispatch: Dispatch<SetMessage>): boolean => {
  if (invalidUsername(username)) {
    attemptSetMessage({ text: 'Please select a username', type: 'warning' })(dispatch);
    return false;
  }
  return true;
};

export const validEmail = (email: string): ValidateAction => (dispatch: Dispatch<SetMessage>): boolean => {
  if (invalidEmail(email)) {
    attemptSetMessage({ text: 'Please enter a valid email address', type: 'warning' })(dispatch);
    return false;
  }
  return true;
};

export const validPassword = (password: string): ValidateAction => (dispatch: Dispatch<SetMessage>): boolean => {
  if (invalidPassword(password)) {
    attemptSetMessage({ text: 'Passwords must be atleast 8 characters long', type: 'warning' })(dispatch);
    return false;
  }
  return true;
};

export const validPasswordConfirmation = (password: string, passwordConfirmation: string): ValidateAction => (
  dispatch: Dispatch<SetMessage>,
): boolean => {
  if (invalidPasswordConfirmation(password, passwordConfirmation)) {
    attemptSetMessage({ text: 'Passwordconfirmation does not match', type: 'warning' })(dispatch);
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

export const validImage = (file: File): ValidateAction => (dispatch: Dispatch<SetMessage>): boolean => {
  if (!isImage(file)) {
    attemptSetMessage({
      text: `The file you tried to upload is of an invalid type, only the
      following filetypes are permited - jpeg, jpg, svg, png, gif`,
      type: 'warning',
    })(dispatch);
    return false;
  }
  return true;
};
