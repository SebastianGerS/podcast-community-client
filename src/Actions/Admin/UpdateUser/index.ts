import { Dispatch } from 'redux';
import * as actionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../../Message';
import { toggleUserModal, ToggleUserModal } from '../../Modal';
import { atemptGetUsers, GetUsersAction } from '../GetUsers';
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

interface AdminUpdateUserFailur {
  type: actionTypes.ADMIN_UPDATE_USER_FAILUR;
}

export const userUpdateFailure = (): AdminUpdateUserFailur => ({
  type: actionTypes.ADMIN_UPDATE_USER_FAILUR,
});

export type AdminUpdateUserAction = AdminUpdateUserStart | AdminUpdateUserSuccess | AdminUpdateUserFailur;

const updateUser = (id: string, user: User): Promise<Response> => Fetch(`/admin/users/${id}`, 'PUT', user);

type AtemptUpdateUserAction = (
  dispatch: Dispatch<AdminUpdateUserAction | SetMessage | GetUsersAction | ToggleUserModal>
) => Promise<void>

export const atemptUpdateUser = (id: string, user: User): AtemptUpdateUserAction => async (
  dispatch: Dispatch<AdminUpdateUserAction | SetMessage | GetUsersAction | ToggleUserModal>,
): Promise<void> => {
  dispatch(startUpdateUser());
  const response = await updateUser(id, user);

  if (response.message === 'Failed to fetch') {
    dispatch(userUpdateFailure());
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(userUpdateFailure());
    const text = response.error.errmsg ? response.error.errmsg : response.message;
    (atemptSetMessage({ text, type: 'warning' }))(dispatch);
  }

  if (response.info) {
    dispatch(userUpdated());
    atemptGetUsers({ term: '', type: 'user', offset: store.getState().AdminReducer.offset - 10 })(dispatch);
    dispatch(toggleUserModal());
    (atemptSetMessage({ text: response.info, type: 'success' }))(dispatch);
  }
};
