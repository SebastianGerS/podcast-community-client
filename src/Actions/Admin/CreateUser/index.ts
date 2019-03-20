import JWT from 'jsonwebtoken';
import { Dispatch } from 'redux';
import store from '../../../Store';
import config from '../../../Config/config';
import * as actionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { toggleUserModal, ToggleUserModal } from '../../Modal';
import { attemptGetUsers, GetUsersAction } from '../GetUsers';
import { User } from '../../../Models/User';

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

export type CreateUserAction = CreateUserStart | CreateUserSuccess | CreateUserFailure;

const createUser = (user: string): Promise<Response> => Fetch('/admin/users', 'POST', user);

type AttemptCreateUserAction = (
  dispatch: Dispatch<CreateUserAction | SetMessage | GetUsersAction | ToggleUserModal>
) => Promise<void>;

export const attemptCreateUser = (user: User): AttemptCreateUserAction => async (
  dispatch: Dispatch<CreateUserAction | SetMessage | GetUsersAction | ToggleUserModal>,
): Promise<void> => {
  dispatch(startUserCreation());
  const ttemptoken = JWT.sign(user, config.JWT_SECRET);

  const response = await createUser(JSON.stringify({ token: ttemptoken })).catch(error => error);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(userCreationFailure());
    const text = response.message ? response.message : response.error.errmsg;

    (attemptSetMessage({ text, type: 'warning' }))(dispatch);
  }

  if (response.token) {
    dispatch(userCreated());
    attemptGetUsers({ term: '', type: 'user', offset: store.getState().AdminReducer.offset - 10 })(dispatch);
    (attemptSetMessage({ text: 'User was created', type: 'success' }))(dispatch);
    dispatch(toggleUserModal());
  }
};
