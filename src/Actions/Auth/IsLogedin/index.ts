import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import * as Auth from '../../../Helpers/Auth';
import { User } from '../../../Models/User';
import { userLogedout, UserLogoutSuccess } from '../Logout';

export interface IsLogedIn {
  type: ActionTypes.IS_LOGED_IN;
  user: User;
}

export const isLogedIn = (user: User): IsLogedIn => ({
  type: ActionTypes.IS_LOGED_IN,
  user,
});

type CheckIfLogedInAction = (dispatch: Dispatch<IsLogedIn|UserLogoutSuccess>) => Promise<void>

export const checkIfLogedIn = (): CheckIfLogedInAction => async (
  dispatch: Dispatch<IsLogedIn|UserLogoutSuccess>,
): Promise<void> => {
  const token = Auth.getToken();

  if (token) {
    const decoded = await Auth.verifytoken(token).catch(error => error);
    if (decoded.user) {
      dispatch(isLogedIn(decoded.user));
    } else if (Auth.logedout()) {
      dispatch(userLogedout());
    }
  }
};
