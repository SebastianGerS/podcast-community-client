import JWT from 'jsonwebtoken';
import ActionTypes from './types';
import { Fetch, formatError } from '../../Helpers/Fetch';
import { atemptSetMessage } from '../Message';
import {
  atemptGetSelf, userLogedout, validPassword, validPasswordConfirmation,
} from '../Auth';
import { removeToken } from '../../Helpers/Auth';
import config from '../../Config/config';

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

export const startGetSubscriptions = () => ({
  type: ActionTypes.GET_SUBSCRIPTIONS_START,

});
export const gotSubscriptions = ({ subscriptions, categories }) => ({
  type: ActionTypes.GET_SUBSCRIPTIONS_SUCCESS,
  subscriptions,
  categories,
});
export const getSubscriptionsFailure = () => ({
  type: ActionTypes.GET_SUBSCRIPTIONS_FAILUR,

});
export const startCreateCategory = () => ({
  type: ActionTypes.CREATE_CATEGORY_START,
});
export const catagoryCreated = () => ({
  type: ActionTypes.CREATE_CATEGORY_SUCCESS,
});
export const createCategoryFailure = () => ({
  type: ActionTypes.CREATE_CATEGORY_FAILUR,

});
export const startUpdateCategory = () => ({
  type: ActionTypes.UPDATE_CATEGORY_START,
});
export const catagoryUpdated = () => ({
  type: ActionTypes.UPDATE_CATEGORY_SUCCESS,
});
export const updateCategoryFailure = () => ({
  type: ActionTypes.UPDATE_CATEGORY_FAILUR,

});
export const startDeleteCategory = () => ({
  type: ActionTypes.DELETE_CATEGORY_START,
});
export const catagoryDeleted = () => ({
  type: ActionTypes.DELETE_CATEGORY_SUCCESS,
});
export const deleteCategoryFailure = () => ({
  type: ActionTypes.DELETE_CATEGORY_FAILUR,

});

export const startDeleteSelf = () => ({
  type: ActionTypes.DELETE_SELF_START,
});
export const selfDeleted = () => ({
  type: ActionTypes.DELETE_SELF_SUCCESS,
});
export const deleteSelfFailure = () => ({
  type: ActionTypes.DELETE_SELF_FAILUR,

});

const updateUser = body => Fetch('/users', 'PUT', body);

const deleteSelf = () => Fetch('/users', 'DELETE', {});

const getUser = userId => Fetch(`/users/${userId}`, 'GET', {});

const getSubscriptions = userId => Fetch(`/users/${userId}/subscriptions`, 'GET', {});

const createCategory = body => Fetch('/categories', 'POST', body);

const updateCategory = (id, body) => Fetch(`/categories/${id}`, 'PUT', body);

const deleteCategory = id => Fetch(`/categories/${id}`, 'DELETE', {});


export const atemptGetUser = id => async (dispatch) => {
  dispatch(startGettingUser());

  const response = await getUser(id).catch(error => error);

  if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ text: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

  if (response.error) {
    dispatch(getUserFailure());

    dispatch(atemptSetMessage({ text: response.error.errmsg, type: 'info' }));
  }

  if (response.user) dispatch(gotUser(response.user));
};

export const atemptUpdateUser = (_id, data) => async (dispatch) => {
  let dataIsValid = true;
  let body = data;

  if (data.password && data.passwordConfirmation) {
    dataIsValid = dispatch(validPassword(data.password))
    && dispatch(validPasswordConfirmation(data.validPasswordConfirmation));

    body = { password: JWT.sign(data.password, config.JWT_SECRET) };
  }

  if (dataIsValid) {
    dispatch(startUpdateUser());

    const response = await updateUser(body).catch(error => error);

    if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ text: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

    if (response.error) {
      dispatch(userUpdateFailure());

      dispatch(atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' }));
    }

    if (response.info) {
      dispatch(UserUpdated());
      dispatch(atemptGetUser(_id));
      dispatch(atemptGetSelf());
      dispatch(atemptSetMessage({ text: response.info, type: 'success' }));
    }
  }
};

export const atemptDeleteSelf = () => async (dispatch) => {
  dispatch(startDeleteSelf());
  const response = await deleteSelf().catch(error => error);
  if (response.message === 'Failed to fetch') {
    dispatch(atemptSetMessage({ text: 'unable to connect to resource pleas check your internet conection', type: 'error' }));
    dispatch(deleteSelfFailure());
  }
  if (response.error) {
    dispatch(deleteSelfFailure());
    dispatch(atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' }));
  }

  if (response.info) {
    dispatch(selfDeleted());
    removeToken();
    dispatch(userLogedout());
    dispatch(atemptSetMessage({ text: 'Your Account was deleted', type: 'warning' }));
  }
};

export const atemptGetSubscriptions = userId => async (dispatch) => {
  dispatch(startGetSubscriptions());

  const response = await getSubscriptions(userId);

  if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ text: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

  if (response.error) {
    dispatch(getSubscriptionsFailure());

    dispatch(atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' }));
  }
  if (response.subscriptions) {
    dispatch(gotSubscriptions(response));
    dispatch(atemptGetSelf());
  }
};

export const atemptCreateCategory = ({ name, userId }) => async (dispatch) => {
  dispatch(startCreateCategory());
  const response = await createCategory({ name }).catch(error => error);

  if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ text: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

  if (response.error) {
    dispatch(createCategoryFailure());

    dispatch(atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' }));
  }
  if (response.category) {
    dispatch(catagoryCreated());

    dispatch(atemptGetSubscriptions(userId));
  }
};

export const atemptUpdateCategory = ({ userId, categoryId, body }) => async (dispatch) => {
  dispatch(startUpdateCategory());
  const response = await updateCategory(categoryId, body).catch(error => error);

  if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ text: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

  if (response.error) {
    dispatch(updateCategoryFailure());

    dispatch(atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' }));
  }
  if (response.category) {
    dispatch(catagoryUpdated());
    dispatch(atemptGetSubscriptions(userId));
  }
};

export const atemptDeleteCategory = (userId, categoryId) => async (dispatch) => {
  dispatch(startDeleteCategory());
  const response = await deleteCategory(categoryId).catch(error => error);

  if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ text: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

  if (response.error) {
    dispatch(deleteCategoryFailure());

    dispatch(atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' }));
  }
  if (response.category) {
    dispatch(catagoryDeleted());
    dispatch(atemptGetSubscriptions(userId));
  }
};
