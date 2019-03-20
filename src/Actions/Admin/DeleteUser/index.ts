
import { Dispatch } from 'redux';
import store from '../../../Store';
import * as actionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { toggleUserModal, ToggleUserModal } from '../../Modal';
import { attemptGetUsers, GetUsersAction } from '../GetUsers';

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


type AttemptDeleteUserAction = (
  dispatch: Dispatch<DeleteUserAction | SetMessage | GetUsersAction | ToggleUserModal>
) => Promise<void>;

export const attemptDeleteUser = (userId: string): AttemptDeleteUserAction => async (
  dispatch: Dispatch<DeleteUserAction | SetMessage | GetUsersAction | ToggleUserModal>,
): Promise<void> => {
  dispatch(startUserDeletion());

  const response = await deleteUser(userId).catch(error => error);

  if (response.message === 'Failed to fetch') {
    dispatch(userDeletionFailure());
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(userDeletionFailure());
    const text = response.message ? response.message : response.error.errmsg;

    (attemptSetMessage({ text, type: 'warning' }))(dispatch);
  }

  if (response.info) {
    dispatch(userDeleted());
    attemptGetUsers({ term: '', type: 'user', offset: store.getState().AdminReducer.offset - 10 })(dispatch);
    attemptSetMessage({ text: response.info, type: 'warning' })(dispatch);
    dispatch(toggleUserModal());
  }
};
