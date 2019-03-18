
import { Dispatch } from 'redux';
import store from '../../../Store';
import * as actionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../../Message';
import { toggleUserModal, ToggleUserModal } from '../../Modal';
import { atemptGetUsers, GetUsersAction } from '../GetUsers';

interface DeleteUserStart {
  type: actionTypes.DELETE_USER_START;
}

const startUserDeletion = (): DeleteUserStart => ({
  type: actionTypes.DELETE_USER_START,
});

interface DeleteUserSuccess {
  type: actionTypes.DELETE_USER_SUCCESS;
}

const userDeleted = (): DeleteUserSuccess => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

interface DeleteUserFailur {
  type: actionTypes.DELETE_USER_FAILUR;
}

const userDeletionFailure = (): DeleteUserFailur => ({
  type: actionTypes.DELETE_USER_FAILUR,
});

export type DeleteUserAction = DeleteUserStart | DeleteUserSuccess | DeleteUserFailur;

const deleteUser = (id: string): Promise<Response> => Fetch(`/admin/users/${id}`, 'DELETE', {});


type AtemptDeleteUserAction = (
  dispatch: Dispatch<DeleteUserAction | SetMessage | GetUsersAction | ToggleUserModal>
) => Promise<void>;

export const atemptDeleteUser = (userId: string): AtemptDeleteUserAction => async (
  dispatch: Dispatch<DeleteUserAction | SetMessage | GetUsersAction | ToggleUserModal>,
): Promise<void> => {
  dispatch(startUserDeletion());

  const response = await deleteUser(userId).catch(error => error);

  if (response.message === 'Failed to fetch') {
    dispatch(userDeletionFailure());
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(userDeletionFailure());
    const text = response.message ? response.message : response.error.errmsg;

    (atemptSetMessage({ text, type: 'warning' }))(dispatch);
  }

  if (response.info) {
    dispatch(userDeleted());
    atemptGetUsers({ term: '', type: 'user', offset: store.getState().AdminReducer.offset - 10 })(dispatch);
    atemptSetMessage({ text: response.info, type: 'warning' })(dispatch);
    dispatch(toggleUserModal());
  }
};
