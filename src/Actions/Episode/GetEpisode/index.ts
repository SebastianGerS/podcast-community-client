import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { Episode } from '../../../Models/Episode';
import { setRedirect, SetRedirect } from '../../Redirect';

interface GetEpisodeStart {
  type: ActionTypes.GET_EPISODE_START;
}

const startGetEpisode = (): GetEpisodeStart => ({
  type: ActionTypes.GET_EPISODE_START,
});

interface GetEpisodeSuccess {
  type: ActionTypes.GET_EPISODE_SUCCESS;
  episode: Episode;
}

const gotEpisode = (episode: Episode): GetEpisodeSuccess => ({
  type: ActionTypes.GET_EPISODE_SUCCESS,
  episode,
});

interface GetEpisodeFailure {
  type: ActionTypes.GET_EPISODE_FAILURE;
}

const getEpisodeFailure = (): GetEpisodeFailure => ({
  type: ActionTypes.GET_EPISODE_FAILURE,
});

const getEpisode = (episodeId: string): Promise<Response> => Fetch(`/episodes/${episodeId}`, 'GET', {});

export type GetEpisodeAction = GetEpisodeStart | GetEpisodeSuccess |GetEpisodeFailure | SetRedirect;

type AttemptGetEpisodeAction = (dispatch: Dispatch<GetEpisodeAction | SetMessage>) => Promise<void>;

export const attemptGetEpisode = (episodeId: string): AttemptGetEpisodeAction => async (
  dispatch: Dispatch<GetEpisodeAction | SetMessage>,
): Promise<void> => {
  dispatch(startGetEpisode());

  const response = await getEpisode(episodeId).catch(error => error);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getEpisodeFailure());
    dispatch(setRedirect({ to: '/episodes' }));
    attemptSetMessage({ text: response.error.errmsg, type: 'info' })(dispatch);
  }

  if (response.length !== 0 && !response.error && !response.message) {
    dispatch(gotEpisode(response));
  }
};
