import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';

interface GetEpisodeRatingStart {
  type: ActionTypes.GET_EPISODE_RATING_START;
}

const startGetEpisodeRating = (): GetEpisodeRatingStart => ({
  type: ActionTypes.GET_EPISODE_RATING_START,
});

interface GetEpisodeRatingSuccess {
  type: ActionTypes.GET_EPISODE_RATING_SUCCESS;
  rating: number;
}

const getEpisodeRatingSuccess = (rating: number): GetEpisodeRatingSuccess => ({
  type: ActionTypes.GET_EPISODE_RATING_SUCCESS,
  rating,
});

interface GetEpisodeRatingFailure {
  type: ActionTypes.GET_EPISODE_RATING_FAILURE;
}

const getEpisodeRatingFailure = (): GetEpisodeRatingFailure => ({
  type: ActionTypes.GET_EPISODE_RATING_FAILURE,
});

const getEpisodeRating = (podcastId: string, episodeId: string): Promise<Response> => (
  Fetch(`/podcasts/${podcastId}/episodes/${episodeId}/rating`, 'GET', {})
);

export type GetEpisodeRatingAction = (
  GetEpisodeRatingStart | GetEpisodeRatingSuccess | GetEpisodeRatingFailure
);

type AttemptGetEpisodeRatingAction = (dispatch: Dispatch<GetEpisodeRatingAction | SetMessage>) => Promise<void>;

export const attemptGetEpisodeRating = (podcastId: string, episodeId: string): AttemptGetEpisodeRatingAction => async (
  dispatch: Dispatch<GetEpisodeRatingAction | SetMessage>,
): Promise<void> => {
  dispatch(startGetEpisodeRating());

  const response = await getEpisodeRating(podcastId, episodeId).catch(error => error);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getEpisodeRatingFailure());
    attemptSetMessage({ text: response.error.errmsg, type: 'info' })(dispatch);
  }

  if (response.rating) {
    dispatch(getEpisodeRatingSuccess(response.rating));
  }
};
