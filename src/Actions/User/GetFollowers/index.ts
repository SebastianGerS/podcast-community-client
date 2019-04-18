
import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, formatError, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { User } from '../../../Models/User';

interface GetFollowsStart {
  type: ActionTypes.GET_FOLLOWS_START;
}

export const startGetFollows = (): GetFollowsStart => ({
  type: ActionTypes.GET_FOLLOWS_START,
});
export interface Follows {
  followers: User[];
  following: User[];
  requests: User[];
}
export interface GetFollowsSuccess extends Follows{
  type: ActionTypes.GET_FOLLOWS_SUCCESS;
}

export const getFollowsSuccess = ({ followers, following, requests }: Follows): GetFollowsSuccess => ({
  type: ActionTypes.GET_FOLLOWS_SUCCESS,
  followers,
  following,
  requests,
});

interface GetFollowsFailure {
  type: ActionTypes.GET_FOLLOWS_FAILURE;
}

export const getFollowsFailure = (): GetFollowsFailure => ({
  type: ActionTypes.GET_FOLLOWS_FAILURE,
});

export type GetFollowsAction = GetFollowsStart | GetFollowsSuccess | GetFollowsFailure;

const getFollows = (): Promise<Response> => Fetch('/follows', 'GET', {});

type AttemptGetFollowsAction = (
  dispatch: Dispatch<GetFollowsAction | SetMessage>
) => Promise<void>;

export const attemptGetFollows = (): AttemptGetFollowsAction => async (
  dispatch: Dispatch<GetFollowsAction | SetMessage>,
): Promise<void> => {
  dispatch(startGetFollows());

  const response = await getFollows();

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getFollowsFailure());

    attemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' })(dispatch);
  }
  if (response.followers) {
    dispatch(getFollowsSuccess(response));
  }
};
