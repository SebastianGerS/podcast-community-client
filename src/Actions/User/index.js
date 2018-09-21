import ActionTypes from './types';
import { Fetch, formatError } from '../../Helpers/Fetch';
import { atemptSetMessage } from '../Message';

export const startUpdateUser = () => (
  { type: ActionTypes.UPDATE_USER_START }
);
export const UserUpdated = () => (
  {
    type: ActionTypes.UPDATE_USER_SUCCESS,
  }
);

export const userUpdateFailure = () => (
  { type: ActionTypes.UPDATE_USER_FAILUR }
);

export const startGettingUser = () => (
  { type: ActionTypes.GET_USER_START }
);
export const gotUser = user => (
  {
    type: ActionTypes.GET_USER_SUCCESS,
    user,
  }
);

export const getUserFailure = () => (
  { type: ActionTypes.GET_USER_FAILUR }
);

const updateUser = body => Fetch('/users', 'PUT', body);

const getUser = id => Fetch(`/users/${id}`, 'GET', {});


export const atemptGetUser = id => async (dispatch) => {
  dispatch(startGettingUser());

  const response = await getUser(id).catch(error => error);

  if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ message: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

  if (response.error) {
    dispatch(getUserFailure());

    dispatch(atemptSetMessage({ message: response.error.errmsg, type: 'info' }));
  }

  if (response.user) dispatch(gotUser(response.user));
};

export const atemptUpdateUser = (_id, body) => async (dispatch) => {
  dispatch(startUpdateUser());

  const response = await updateUser(body).catch(error => error);
  if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ message: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

  if (response.error) {
    dispatch(userUpdateFailure());

    dispatch(atemptSetMessage({ message: formatError(response.error.errmsg), type: 'info' }));
  }

  if (response.info) {
    dispatch(UserUpdated());
    dispatch(atemptGetUser(_id));
    dispatch(atemptSetMessage({ message: response.info, type: 'success' }));
  }
};
