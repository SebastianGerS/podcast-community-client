import { Dispatch } from 'redux';
import * as actionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { toggleUserModal, ToggleUserModal } from '../../Modal';
import { attemptGetUsers, GetUsersAction } from '../GetUsers';
import store from '../../../Store';
import { User } from '../../../Models/User';

interface AdminUpdateUserStart {
  type: actionTypes.ADMIN_UPDATE_USER_START;
}

export const startUpdateUser = (): AdminUpdateUserStart => ({
  type: actionTypes.ADMIN_UPDATE_USER_START,
});

interface AdminUpdateUserSuccess {
  type: actionTypes.ADMIN_UPDATE_USER_SUCCESS;
}

export const userUpdated = (): AdminUpdateUserSuccess => ({
  type: actionTypes.ADMIN_UPDATE_USER_SUCCESS,
});

interface AdminUpdateUserFailure{
  type: actionTypes.ADMIN_UPDATE_USER_FAILURE;
}

export const userUpdateFailure = (): AdminUpdateUserFailure => ({
  type: actionTypes.ADMIN_UPDATE_USER_FAILURE,
});

export type AdminUpdateUserAction = AdminUpdateUserStart | AdminUpdateUserSuccess | AdminUpdateUserFailure;

const updateUser = (id: string, user: User): Promise<Response> => Fetch(`/admin/users/${id}`, 'PUT', user);

type AttemptUpdateUserAction = (
  dispatch: Dispatch<AdminUpdateUserAction | SetMessage | GetUsersAction | ToggleUserModal>
) => Promise<void>

export const attemptUpdateUser = (id: string, user: User): AttemptUpdateUserAction => async (
  dispatch: Dispatch<AdminUpdateUserAction | SetMessage | GetUsersAction | ToggleUserModal>,
): Promise<void> => {
  dispatch(startUpdateUser());
  const response = await updateUser(id, user);

  if (response.message === 'Failed to fetch') {
    dispatch(userUpdateFailure());
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(userUpdateFailure());
    const text = response.error.errmsg ? response.error.errmsg : response.message;
    (attemptSetMessage({ text, type: 'warning' }))(dispatch);
  }

  if (response.info) {
    dispatch(userUpdated());
    attemptGetUsers({ term: '', type: 'user', offset: store.getState().AdminReducer.offset - 10 })(dispatch);
    dispatch(toggleUserModal());
    (attemptSetMessage({ text: response.info, type: 'success' }))(dispatch);
  }
};
