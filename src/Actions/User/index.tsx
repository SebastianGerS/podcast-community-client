
import { Dispatch } from 'redux';
import JWT from 'jsonwebtoken';
import * as ActionTypes from './types';
import { Fetch, formatError, Response } from '../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../Message';
import {
  atemptGetSelf, userLogedout, validPassword, validPasswordConfirmation, GetSelfSuccess, UserLogoutSuccess,
} from '../Auth';
import { removeToken } from '../../Helpers/Auth';
import config from '../../Config/config';
import { User } from '../../Models/User';
import { Podcast } from '../../Models/Podcast';
import { Category } from '../../Models/Category';

interface UpdateUserStart {
  type: ActionTypes.UPDATE_USER_START;
}

export const startUpdateUser = (): UpdateUserStart => (
  { type: ActionTypes.UPDATE_USER_START }
);

interface UpdateUserSuccess {
  type: ActionTypes.UPDATE_USER_SUCCESS;
}

export const UserUpdated = (): UpdateUserSuccess => (
  {
    type: ActionTypes.UPDATE_USER_SUCCESS,
  }
);

interface UpdateUserFailure {
  type: ActionTypes.UPDATE_USER_FAILUR;
}

export const userUpdateFailure = (): UpdateUserFailure => (
  { type: ActionTypes.UPDATE_USER_FAILUR }
);

export type UpdateUserAction = UpdateUserStart | UpdateUserSuccess | UpdateUserFailure;

interface GetUserStart {
  type: ActionTypes.GET_USER_START;
}

export const startGettingUser = (): GetUserStart => (
  { type: ActionTypes.GET_USER_START }
);

interface GetUserSuccess {
  type: ActionTypes.GET_USER_SUCCESS;
  user: User;
}

export const gotUser = (user: User): GetUserSuccess => (
  {
    type: ActionTypes.GET_USER_SUCCESS,
    user,
  }
);

interface GetUserFailure {
  type: ActionTypes.GET_USER_FAILUR;
}

export const getUserFailure = (): GetUserFailure => (
  { type: ActionTypes.GET_USER_FAILUR }
);

export type GetUserAction = GetUserStart | GetUserSuccess | GetUserFailure;

interface GetSubscriptionsStart {
  type: ActionTypes.GET_SUBSCRIPTIONS_START;
}

export const startGetSubscriptions = (): GetSubscriptionsStart => ({
  type: ActionTypes.GET_SUBSCRIPTIONS_START,
});

interface Subscriptions {
  subscriptions: Podcast[];
  categories: Category[];
}
interface GetSubscriptionsSuccess extends Subscriptions {
  type: ActionTypes.GET_SUBSCRIPTIONS_SUCCESS;
}

export const gotSubscriptions = ({ subscriptions, categories }: Subscriptions): GetSubscriptionsSuccess => ({
  type: ActionTypes.GET_SUBSCRIPTIONS_SUCCESS,
  subscriptions,
  categories,
});

interface GetSubscriptionsFailure {
  type: ActionTypes.GET_SUBSCRIPTIONS_FAILUR;
}

export const getSubscriptionsFailure = (): GetSubscriptionsFailure => ({
  type: ActionTypes.GET_SUBSCRIPTIONS_FAILUR,
});

export type GetSubscriptionsAction = GetSubscriptionsStart | GetSubscriptionsSuccess | GetSubscriptionsFailure;

interface CreateCategoryStart {
  type: ActionTypes.CREATE_CATEGORY_START;
}

export const startCreateCategory = (): CreateCategoryStart => ({
  type: ActionTypes.CREATE_CATEGORY_START,
});

interface CreateCategorySuccess {
  type: ActionTypes.CREATE_CATEGORY_SUCCESS;
}

export const catagoryCreated = (): CreateCategorySuccess => ({
  type: ActionTypes.CREATE_CATEGORY_SUCCESS,
});

interface CreateCategoryFailure {
  type: ActionTypes.CREATE_CATEGORY_FAILUR;
}

export const createCategoryFailure = (): CreateCategoryFailure => ({
  type: ActionTypes.CREATE_CATEGORY_FAILUR,
});

export type CreateCategoryAction = CreateCategoryStart | CreateCategorySuccess | CreateCategoryFailure;

interface UpdateCategoryStart {
  type: ActionTypes.UPDATE_CATEGORY_START;
}

export const startUpdateCategory = (): UpdateCategoryStart => ({
  type: ActionTypes.UPDATE_CATEGORY_START,
});

interface UpdateCategorySuccess {
  type: ActionTypes.UPDATE_CATEGORY_SUCCESS;
}

export const catagoryUpdated = (): UpdateCategorySuccess => ({
  type: ActionTypes.UPDATE_CATEGORY_SUCCESS,
});

interface UpdateCategoryFailure {
  type: ActionTypes.UPDATE_CATEGORY_FAILUR;
}

export const updateCategoryFailure = (): UpdateCategoryFailure => ({
  type: ActionTypes.UPDATE_CATEGORY_FAILUR,
});

export type UpdateCategoryAction = UpdateCategoryStart | UpdateCategorySuccess | UpdateCategoryFailure;

interface DeleteCategoryStart {
  type: ActionTypes.DELETE_CATEGORY_START;
}

export const startDeleteCategory = (): DeleteCategoryStart => ({
  type: ActionTypes.DELETE_CATEGORY_START,
});

interface DeleteCategorySuccess {
  type: ActionTypes.DELETE_CATEGORY_SUCCESS;
}

export const catagoryDeleted = (): DeleteCategorySuccess => ({
  type: ActionTypes.DELETE_CATEGORY_SUCCESS,
});

interface DeleteCategoryFailure {
  type: ActionTypes.DELETE_CATEGORY_FAILUR;
}

export const deleteCategoryFailure = (): DeleteCategoryFailure => ({
  type: ActionTypes.DELETE_CATEGORY_FAILUR,
});

export type DeleteCategoryAction = DeleteCategoryStart | DeleteCategorySuccess | DeleteCategoryFailure;

interface DeleteSelfStart {
  type: ActionTypes.DELETE_SELF_START;
}

export const startDeleteSelf = (): DeleteSelfStart => ({
  type: ActionTypes.DELETE_SELF_START,
});

interface DeleteSelfSuccess {
  type: ActionTypes.DELETE_SELF_SUCCESS;
}

export const selfDeleted = (): DeleteSelfSuccess => ({
  type: ActionTypes.DELETE_SELF_SUCCESS,
});

interface DeleteSelfFailure {
  type: ActionTypes.DELETE_SELF_FAILUR;
}

export const deleteSelfFailure = (): DeleteSelfFailure => ({
  type: ActionTypes.DELETE_SELF_FAILUR,
});

export type DeleteSelfAction = DeleteSelfStart | DeleteSelfSuccess | DeleteSelfFailure;

const updateUser = (body: object): Promise<Response> => Fetch('/users', 'PUT', body);

const deleteSelf = (): Promise<Response> => Fetch('/users', 'DELETE', {});

const getUser = (userId: string): Promise<Response> => Fetch(`/users/${userId}`, 'GET', {});

const getSubscriptions = (userId: string): Promise<Response> => Fetch(`/users/${userId}/subscriptions`, 'GET', {});

const createCategory = (body: object): Promise<Response> => Fetch('/categories', 'POST', body);

const updateCategory = (id: string, body: object): Promise<Response> => Fetch(`/categories/${id}`, 'PUT', body);

const deleteCategory = (id: string): Promise<Response> => Fetch(`/categories/${id}`, 'DELETE', {});

type AtemptGetuserAction = (dispatch: Dispatch<GetUserAction | SetMessage>) => Promise<void>;

export const atemptGetUser = (id: string): AtemptGetuserAction => async (
  dispatch: Dispatch<GetUserAction | SetMessage>,
): Promise<void> => {
  dispatch(startGettingUser());

  const response = await getUser(id).catch(error => error);

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getUserFailure());

    atemptSetMessage({ text: response.error.errmsg, type: 'info' })(dispatch);
  }

  if (response.user) dispatch(gotUser(response.user));
};

interface UpdateUserData {
  password?: string;
  passwordConfirmation?: string;
}

type AtemptUpdateUserAction = (
  dispatch: Dispatch<UpdateUserAction | SetMessage | GetUserAction | GetSelfSuccess>
) => Promise<void>;

export const atemptUpdateUser = (_id: string, data: UpdateUserData): AtemptUpdateUserAction => async (
  dispatch: Dispatch<UpdateUserAction | SetMessage | GetUserAction | GetSelfSuccess>,
): Promise<void> => {
  let dataIsValid = true;
  let body = data;

  if (data.password && data.passwordConfirmation) {
    dataIsValid = validPassword(data.password)(dispatch)
    && validPasswordConfirmation(data.password, data.passwordConfirmation)(dispatch);

    body = { password: JWT.sign(data.password, config.JWT_SECRET) };
  }

  if (dataIsValid) {
    dispatch(startUpdateUser());

    const response = await updateUser(body).catch(error => error);

    if (response.message === 'Failed to fetch') {
      atemptSetMessage(
        {
          text: 'unable to connect to resource pleas check your internet conection',
          type: 'error',
        },
      )(dispatch);
    }

    if (response.error) {
      dispatch(userUpdateFailure());

      atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' })(dispatch);
    }

    if (response.info) {
      dispatch(UserUpdated());
      atemptGetUser(_id)(dispatch);
      atemptGetSelf()(dispatch);
      atemptSetMessage({ text: response.info, type: 'success' })(dispatch);
    }
  }
};

type AtemptDeleteSelfAction = (dispatch: Dispatch<DeleteSelfAction | SetMessage | UserLogoutSuccess>) => Promise<void>;

export const atemptDeleteSelf = (): AtemptDeleteSelfAction => async (
  dispatch: Dispatch<DeleteSelfAction | SetMessage | UserLogoutSuccess>,
): Promise<void> => {
  dispatch(startDeleteSelf());
  const response = await deleteSelf().catch(error => error);
  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
    dispatch(deleteSelfFailure());
  }
  if (response.error) {
    dispatch(deleteSelfFailure());
    atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' })(dispatch);
  }

  if (response.info) {
    dispatch(selfDeleted());
    removeToken();
    dispatch(userLogedout());
    atemptSetMessage({ text: 'Your Account was deleted', type: 'warning' })(dispatch);
  }
};

type AtemptGetSubscriptionsAction = (
  dispatch: Dispatch<GetSubscriptionsAction | SetMessage | GetSelfSuccess>
) => Promise<void>;

export const atemptGetSubscriptions = (userId: string): AtemptGetSubscriptionsAction => async (
  dispatch: Dispatch<GetSubscriptionsAction | SetMessage | GetSelfSuccess>,
): Promise<void> => {
  dispatch(startGetSubscriptions());

  const response = await getSubscriptions(userId);

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getSubscriptionsFailure());

    atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' })(dispatch);
  }
  if (response.subscriptions) {
    dispatch(gotSubscriptions(response));
    atemptGetSelf()(dispatch);
  }
};

export interface CategoryData {
  name: string;
  userId: string;
}

type AtemptCreateCategoryAction = (
  dispatch: Dispatch<CreateCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>
) => Promise<void>;

export const atemptCreateCategory = ({ name, userId }: CategoryData): AtemptCreateCategoryAction => async (
  dispatch: Dispatch<CreateCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>,
): Promise<void> => {
  dispatch(startCreateCategory());
  const response = await createCategory({ name }).catch(error => error);

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(createCategoryFailure());

    atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' })(dispatch);
  }
  if (response.category) {
    dispatch(catagoryCreated());

    atemptGetSubscriptions(userId)(dispatch);
  }
};

export interface UpdateCategory {
  userId: string;
  categoryId: string;
  body: object;
}

type AtemptUpdateCategoryAction = (
  dispatch: Dispatch<UpdateCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>
) => Promise<void>;

export const atemptUpdateCategory = (
  { userId, categoryId, body }: UpdateCategory,
): AtemptUpdateCategoryAction => async (
  dispatch: Dispatch<UpdateCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>,
): Promise<void> => {
  dispatch(startUpdateCategory());
  const response = await updateCategory(categoryId, body).catch(error => error);

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(updateCategoryFailure());

    atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' })(dispatch);
  }
  if (response.category) {
    dispatch(catagoryUpdated());
    atemptGetSubscriptions(userId)(dispatch);
  }
};

type AtemptDeleteCategoryAction = (
  dispatch: Dispatch<DeleteCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>
) => Promise<void>;

export const atemptDeleteCategory = (userId: string, categoryId: string): AtemptDeleteCategoryAction => async (
  dispatch: Dispatch<DeleteCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>,
): Promise<void> => {
  dispatch(startDeleteCategory());
  const response = await deleteCategory(categoryId).catch(error => error);

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(deleteCategoryFailure());

    atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' })(dispatch);
  }
  if (response.category) {
    dispatch(catagoryDeleted());
    atemptGetSubscriptions(userId)(dispatch);
  }
};

export type UserActions = (
  GetUserAction | UpdateUserAction | DeleteSelfAction | GetSubscriptionsAction
  | CreateCategoryAction | UpdateCategoryAction | DeleteCategoryAction
);
