import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../../Message';
import { Podcast } from '../../../Models/Podcast';

interface GetPodcastStart {
  type: ActionTypes.GET_PODCAST_START;
}

const startGetPodcast = (): GetPodcastStart => ({
  type: ActionTypes.GET_PODCAST_START,
});

interface GetPodcastSuccess {
  type: ActionTypes.GET_PODCAST_SUCCESS;
  podcast: Podcast;
}

const gotPodcast = (podcast: Podcast): GetPodcastSuccess => ({
  type: ActionTypes.GET_PODCAST_SUCCESS,
  podcast,
});

interface GetPodcastFailure {
  type: ActionTypes.GET_PODCAST_FAILURE;
}

const getPodcastFailure = (): GetPodcastFailure => ({
  type: ActionTypes.GET_PODCAST_FAILURE,
});

const getPodcast = (podcastId: string): Promise<Response> => Fetch(`/podcasts/${podcastId}`, 'GET', {});

export type GetPodcastAction = GetPodcastStart | GetPodcastSuccess |GetPodcastFailure;

type AtemptGetPodcastAction = (dispatch: Dispatch<GetPodcastAction | SetMessage>) => Promise<void>;

export const atemptGetPodcast = (podcastId: string): AtemptGetPodcastAction => async (
  dispatch: Dispatch<GetPodcastAction | SetMessage>,
): Promise<void> => {
  dispatch(startGetPodcast());

  const response = await getPodcast(podcastId).catch(error => error);

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getPodcastFailure());

    atemptSetMessage({ text: response.error.errmsg, type: 'info' })(dispatch);
  }

  if (response.length !== 0 && !response.error && !response.message) {
    dispatch(gotPodcast(response));
  }
};
