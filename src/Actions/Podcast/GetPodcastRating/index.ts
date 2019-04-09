import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';

interface GetPodcastRatingStart {
  type: ActionTypes.GET_PODCAST_RATING_START;
}

const startGetPodcastRating = (): GetPodcastRatingStart => ({
  type: ActionTypes.GET_PODCAST_RATING_START,
});

interface GetPodcastRatingSuccess {
  type: ActionTypes.GET_PODCAST_RATING_SUCCESS;
  rating: number;
}

const getPodcastRatingSuccess = (rating: number): GetPodcastRatingSuccess => ({
  type: ActionTypes.GET_PODCAST_RATING_SUCCESS,
  rating,
});

interface GetPodcastRatingFailure {
  type: ActionTypes.GET_PODCAST_RATING_FAILURE;
}

const getPodcastRatingFailure = (): GetPodcastRatingFailure => ({
  type: ActionTypes.GET_PODCAST_RATING_FAILURE,
});

const getPodcastRating = (podcastId: string): Promise<Response> => Fetch(`/podcasts/${podcastId}/rating`, 'GET', {});

export type GetPodcastRatingAction = (
  GetPodcastRatingStart | GetPodcastRatingSuccess | GetPodcastRatingFailure
);

type AttemptGetPodcastRatingAction = (dispatch: Dispatch<GetPodcastRatingAction | SetMessage>) => Promise<void>;

export const attemptGetPodcastRating = (podcastId: string): AttemptGetPodcastRatingAction => async (
  dispatch: Dispatch<GetPodcastRatingAction | SetMessage>,
): Promise<void> => {
  dispatch(startGetPodcastRating());

  const response = await getPodcastRating(podcastId).catch(error => error);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getPodcastRatingFailure());
    attemptSetMessage({ text: response.error.errmsg, type: 'info' })(dispatch);
  }

  if (response.rating) {
    dispatch(getPodcastRatingSuccess(response.rating));
  }
};
