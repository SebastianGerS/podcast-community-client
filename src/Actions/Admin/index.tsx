/* eslint-disable  import/no-cycle */
import JWT from 'jsonwebtoken';
import { Dispatch } from 'redux';
import config from '../../Config/config';
import * as actionTypes from './types';
import { Fetch, Response } from '../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../Message';
import { toggleUserModal, ToggleUserModal } from '../Modal';
import store from '../../Store';
import { User } from '../../Models/User';

interface GetUsersStart {
  type: actionTypes.GET_USERS_START;
  data?: Data;
}

const startGetUsers = (): GetUsersStart => ({
  type: actionTypes.GET_USERS_START,
});

interface Data {
  results: User[];
  morePages: boolean;
  offset: number;
  next_offset: number;
}

interface GetUsersSuccess {
  type: actionTypes.GET_USERS_SUCCESS;
  data: Data;
}

const gotUsers = (data: Data): GetUsersSuccess => ({
  type: actionTypes.GET_USERS_SUCCESS,
  data,
});

interface GetUsersFailure {
  type: actionTypes.GET_USERS_FAILUR;
}

const getUsersFailure = (): GetUsersFailure => ({
  type: actionTypes.GET_USERS_FAILUR,
});

export type GetUsersAction = GetUsersStart | GetUsersSuccess | GetUsersFailure;

export interface SetUser {
  type: actionTypes.SET_USER;
  user: User;
}

const setUser = (user: User): SetUser => ({
  type: actionTypes.SET_USER,
  user,
});

export interface UnsetUser {
  type: actionTypes.UNSET_USER;
}

export const unsetUser = (): UnsetUser => ({
  type: actionTypes.UNSET_USER,
});

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

interface CreateUserStart {
  type: actionTypes.CREATE_USER_START;
}

const startUserCreation = (): CreateUserStart => ({
  type: actionTypes.CREATE_USER_START,
});

interface CreateUserSuccess {
  type: actionTypes.CREATE_USER_SUCCESS;
}

const userCreationFailure = (): CreateUserSuccess => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

interface CreateUserFailure {
  type: actionTypes.CREATE_USER_FAILUR;
}

const userCreated = (): CreateUserFailure => ({
  type: actionTypes.CREATE_USER_FAILUR,
});

type CreateUserAction = CreateUserStart | CreateUserSuccess | CreateUserFailure;

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

type DeleteUserAction = DeleteUserStart | DeleteUserSuccess | DeleteUserFailur;

export interface UserSearch {
  offset: number;
  type: string;
  term: string;
}

const getUsers = (
  { offset, type, term }: UserSearch,
): Promise<Response> => Fetch(`/search?term=${term}&type=${type}&offset=${offset}`, 'GET', {});

const updateUser = (id: string, user: User): Promise<Response> => Fetch(`/admin/users/${id}`, 'PUT', user);

const deleteUser = (id: string): Promise<Response> => Fetch(`/admin/users/${id}`, 'DELETE', {});

const createUser = (user: string): Promise<Response> => Fetch('/admin/users', 'POST', user);

export type AtemptGetUsersAction = (dispatch: Dispatch<GetUsersAction | SetMessage>) => Promise<void>;

export const atemptGetUsers = (data: UserSearch): AtemptGetUsersAction => async (
  dispatch: Dispatch<GetUsersAction | SetMessage>,
): Promise<void> => {
  dispatch(startGetUsers());

  const response = await getUsers(data).catch(error => error);
  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getUsersFailure());
    (atemptSetMessage({ text: response.error.errmsg, type: 'warning' }))(dispatch);
  }
  if (response.results) dispatch(gotUsers(response));
};

type SelectUserAction = (dispatch: Dispatch<SetUser | ToggleUserModal>) => void;

export const selectUser = (user: User): SelectUserAction => (dispatch: Dispatch<SetUser | ToggleUserModal>): void => {
  dispatch(setUser(user));
  dispatch(toggleUserModal());
};

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

type AtemptCreateUserAction = (
  dispatch: Dispatch<CreateUserAction | SetMessage | GetUsersAction | ToggleUserModal>
) => Promise<void>;

export const atemptCreateUser = (user: User): AtemptCreateUserAction => async (
  dispatch: Dispatch<CreateUserAction | SetMessage | GetUsersAction | ToggleUserModal>,
): Promise<void> => {
  dispatch(startUserCreation());
  const tempToken = JWT.sign(user, config.JWT_SECRET);

  const response = await createUser(JSON.stringify({ token: tempToken })).catch(error => error);

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(userCreationFailure());
    const text = response.message ? response.message : response.error.errmsg;

    (atemptSetMessage({ text, type: 'warning' }))(dispatch);
  }

  if (response.token) {
    dispatch(userCreated());
    atemptGetUsers({ term: '', type: 'user', offset: store.getState().AdminReducer.offset - 10 })(dispatch);
    (atemptSetMessage({ text: 'User was created', type: 'success' }))(dispatch);
    dispatch(toggleUserModal());
  }
};

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

export type AdminActions = (
  GetUsersAction | AdminUpdateUserAction | CreateUserAction | DeleteUserAction | SetUser | UnsetUser
);
