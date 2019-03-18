
import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, formatError, Response } from '../../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../../Message';
import { userLogedout, UserLogoutSuccess } from '../../Auth';
import { removeToken } from '../../../Helpers/Auth';

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

const deleteSelf = (): Promise<Response> => Fetch('/users', 'DELETE', {});

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
