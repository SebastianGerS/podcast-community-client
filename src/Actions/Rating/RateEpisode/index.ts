import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';

interface RateEpisodeStart {
  type: ActionTypes.RATE_EPISODE_START;
}

const startRateEpisode = (): RateEpisodeStart => ({
  type: ActionTypes.RATE_EPISODE_START,
});

interface RateEpisodeSuccess {
  type: ActionTypes.RATE_EPISODE_SUCCESS;
}

const rateEpisodeSuccess = (): RateEpisodeSuccess => ({
  type: ActionTypes.RATE_EPISODE_SUCCESS,
});

interface RateEpisodeFailure {
  type: ActionTypes.RATE_EPISODE_FAILURE;
}

const RateEpisodeFailure = (): RateEpisodeFailure => ({
  type: ActionTypes.RATE_EPISODE_FAILURE,
});

const RateEpisode = (podcastId: string, episodeRating: object): Promise<Response> => (
  Fetch(`/podcasts/${podcastId}/rating`, 'POST', episodeRating)
);

export type RateEpisodeAction = RateEpisodeStart | RateEpisodeSuccess | RateEpisodeFailure;

type AttemptRateEpisodeAction = (dispatch: Dispatch<RateEpisodeAction | SetMessage>) => Promise<void>;

export const attemptRateEpisode = (podcastId: string, episodeRating: object): AttemptRateEpisodeAction => async (
  dispatch: Dispatch<RateEpisodeAction | SetMessage>,
): Promise<void> => {
  dispatch(startRateEpisode());

  const response = await RateEpisode(podcastId, episodeRating).catch(error => error);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(RateEpisodeFailure());
    attemptSetMessage({ text: response.error.errmsg, type: 'info' })(dispatch);
  }

  if (response.length !== 0 && !response.error && !response.message) {
    dispatch(rateEpisodeSuccess());
    attemptSetMessage({ text: response.info, type: 'success' })(dispatch);
  }
};
