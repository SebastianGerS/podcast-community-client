import { Dispatch } from 'redux';
import * as actionTypes from './types';
import { toggleUserModal, ToggleUserModal } from '../../Modal';
import { User } from '../../../Models/User';

export interface SetUser {
  type: actionTypes.SET_USER;
  user: User;
}

const setUser = (user: User): SetUser => ({
  type: actionTypes.SET_USER,
  user,
});

type SelectUserAction = (dispatch: Dispatch<SetUser | ToggleUserModal>) => void;

export const selectUser = (user: User): SelectUserAction => (dispatch: Dispatch<SetUser | ToggleUserModal>): void => {
  dispatch(setUser(user));
  dispatch(toggleUserModal());
};
