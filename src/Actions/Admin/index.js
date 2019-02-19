import JWT from 'jsonwebtoken';
import config from '../../Config/config'; import actionTypes from './types';
import { Fetch } from '../../Helpers/Fetch';
import { atemptSetMessage } from '../Message';
import { toggleUserModal } from '../Modal';
import store from '../../Store';

const startGetUsers = () => ({
  type: actionTypes.GET_USERS_START,
});

const gotUsers = data => ({
  type: actionTypes.GET_USERS_SUCCESS,
  data,
});
const getUsersFailure = () => ({
  type: actionTypes.GET_USERS_FAILUR,
});

const setUser = user => ({
  type: actionTypes.SET_USER,
  user,
});

export const unsetUser = () => ({
  type: actionTypes.UNSET_USER,
});

export const startUpdateUser = () => ({
  type: actionTypes.ADMIN_UPDATE_USER_START,
});
export const userUpdated = () => ({
  type: actionTypes.ADMIN_UPDATE_USER_SUCCESS,
});

export const userUpdateFailure = () => ({
  type: actionTypes.ADMIN_UPDATE_USER_FAILUR,
});

const startUserCreation = () => ({
  type: actionTypes.CREATE_USER_START,
});
const userCreationFailure = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

const userCreated = () => ({
  type: actionTypes.CREATE_USER_FAILUR,
});

const startUserDeletion = () => ({
  type: actionTypes.DELETE_USER_START,
});
const userDeletionFailure = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

const userDeleted = () => ({
  type: actionTypes.DELETE_USER_FAILUR,
});


const getUsers = (offset, type, term) => Fetch(`/search?term=${term}&type=${type}&offset=${offset}`, 'GET', {});

const updateUser = (id, user) => Fetch(`/admin/users/${id}`, 'PUT', user);

const deleteUser = id => Fetch(`/admin/users/${id}`, 'DELETE', {});

const createUser = user => Fetch('/admin/users', 'POST', user);

export const atemptGetUsers = data => async (dispatch) => {
  dispatch(startGetUsers());
  const { offset, type, term } = data;
  const response = await getUsers(offset, type, term).catch(error => error);
  if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ text: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

  if (response.error) {
    dispatch(getUsersFailure());
    dispatch(atemptSetMessage({ text: response.error.errmsg, type: 'warning' }));
  }
  if (response.results) dispatch(gotUsers(response));
};

export const selectUser = user => (dispatch) => {
  dispatch(setUser(user));
  dispatch(toggleUserModal());
};

export const atemptUpdateUser = (id, user) => async (dispatch) => {
  dispatch(startUpdateUser());
  const response = await updateUser(id, user);

  if (response.message === 'Failed to fetch') {
    dispatch(userUpdateFailure());
    dispatch(atemptSetMessage({ text: 'unable to connect to resource pleas check your internet conection', type: 'error' }));
  }

  if (response.error) {
    dispatch(userUpdateFailure());
    const message = response.error.errmsg ? response.error.errmsg : response.message;
    dispatch(atemptSetMessage({ message, type: 'warning' }));
  }

  if (response.info) {
    dispatch(userUpdated());
    dispatch(atemptGetUsers({ term: '', type: 'user', offset: store.getState().Admin.offset - 10 }));
    dispatch(toggleUserModal());
    dispatch(atemptSetMessage({ text: response.info, type: 'success' }));
  }
};

export const atemptCreateUser = data => async (dispatch) => {
  dispatch(startUserCreation());
  const tempToken = JWT.sign(data, config.JWT_SECRET);

  const response = await createUser(JSON.stringify({ token: tempToken })).catch(error => error);

  if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ text: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

  if (response.error) {
    dispatch(userCreationFailure());
    const message = response.message ? response.message : response.error.errmsg;

    dispatch(atemptSetMessage({ message, type: 'warning' }));
  }

  if (response.token) {
    dispatch(userCreated());
    dispatch(atemptGetUsers({ term: '', type: 'user', offset: store.getState().Admin.offset - 10 }));
    dispatch(atemptSetMessage({ text: 'User was created', type: 'success' }));
    dispatch(toggleUserModal());
  }
};

export const atemptDeleteUser = userId => async (dispatch) => {
  dispatch(startUserDeletion());

  const response = await deleteUser(userId).catch(error => error);

  if (response.message === 'Failed to fetch') {
    dispatch(userDeletionFailure());
    dispatch(atemptSetMessage({ text: 'unable to connect to resource pleas check your internet conection', type: 'error' }));
  }

  if (response.error) {
    dispatch(userDeletionFailure());
    const message = response.message ? response.message : response.error.errmsg;

    dispatch(atemptSetMessage({ message, type: 'warning' }));
  }

  if (response.info) {
    dispatch(userDeleted());
    dispatch(atemptGetUsers({ term: '', type: 'user', offset: store.getState().Admin.offset - 10 }));
    dispatch(atemptSetMessage({ text: response.info, type: 'warning' }));
    dispatch(toggleUserModal());
  }
};
