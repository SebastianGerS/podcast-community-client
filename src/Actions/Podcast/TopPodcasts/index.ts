import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../../Message';
import { Podcast } from '../../../Models/Podcast';

interface GetTopPodcastsStart {
  type: ActionTypes.GET_TOP_PODCASTS_START;
}

const startGetTopPodcasts = (): GetTopPodcastsStart => ({
  type: ActionTypes.GET_TOP_PODCASTS_START,
});

interface GetTopPodcastsSuccess {
  type: ActionTypes.GET_TOP_PODCASTS_SUCCESS;
  podcasts: Podcast[];
}

const gotTopPodcasts = (podcasts: Podcast[]): GetTopPodcastsSuccess => ({
  type: ActionTypes.GET_TOP_PODCASTS_SUCCESS,
  podcasts,
});

interface GetTopPodcastsFailure {
  type: ActionTypes.GET_TOP_PODCASTS_FAILURE;
}

const getTopPodcastsFailure = (): GetTopPodcastsFailure => ({
  type: ActionTypes.GET_TOP_PODCASTS_FAILURE,
});

const getTopPodcasts = (): Promise<Response> => Fetch('/toplist', 'GET', {});

export type GetTopPodcastsAction = GetTopPodcastsStart | GetTopPodcastsSuccess |GetTopPodcastsFailure;

type AtemptGetTopPodcastsAction = (dispatch: Dispatch<GetTopPodcastsAction | SetMessage>) => Promise<void>;

export const atemptGetTopPodcasts = (): AtemptGetTopPodcastsAction => async (
  dispatch: Dispatch<GetTopPodcastsAction | SetMessage>,
): Promise<void> => {
  dispatch(startGetTopPodcasts());
  const response = await getTopPodcasts().catch(error => error);

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getTopPodcastsFailure());

    atemptSetMessage({ text: response.error.errmsg, type: 'info' })(dispatch);
  }

  if (response.length !== 0 && !response.error && !response.message) {
    dispatch(gotTopPodcasts(response));
  }
};
