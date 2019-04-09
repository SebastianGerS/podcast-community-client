import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { Rating } from '../../../Models/Rating';

interface GetPodcastRatingsStart {
  type: ActionTypes.GET_PODCAST_RATINGS_START;
}

const startGetPodcastRatings = (): GetPodcastRatingsStart => ({
  type: ActionTypes.GET_PODCAST_RATINGS_START,
});


interface PodcastRatings {
  episodeRatings: Rating[];
  avrageRating: number;
}

interface GetPodcastRatingsSuccess extends PodcastRatings{
  type: ActionTypes.GET_PODCAST_RATINGS_SUCCESS;
}

const getPodcastRatingsSuccess = (
  { episodeRatings, avrageRating }: PodcastRatings,
): GetPodcastRatingsSuccess => ({
  type: ActionTypes.GET_PODCAST_RATINGS_SUCCESS,
  episodeRatings,
  avrageRating,
});

interface GetPodcastRatingsFailure {
  type: ActionTypes.GET_PODCAST_RATINGS_FAILURE;
}

const getPodcastRatingsFailure = (): GetPodcastRatingsFailure => ({
  type: ActionTypes.GET_PODCAST_RATINGS_FAILURE,
});

const getPodcastRatings = (podcastId: string): Promise<Response> => (
  Fetch(`/podcasts/${podcastId}/episodes/ratings`, 'GET', {})
);

export type GetPodcastRatingsAction = (
  GetPodcastRatingsStart | GetPodcastRatingsSuccess | GetPodcastRatingsFailure
);

type AttemptGetPodcastRatingsAction = (
  (dispatch: Dispatch<GetPodcastRatingsAction | SetMessage>) => Promise<void>
);

export const attemptGetPodcastRatings = (
  podcastId: string,
): AttemptGetPodcastRatingsAction => async (
  dispatch: Dispatch<GetPodcastRatingsAction | SetMessage>,
): Promise<void> => {
  dispatch(startGetPodcastRatings());

  const response = await getPodcastRatings(podcastId).catch(error => error);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getPodcastRatingsFailure());
  }

  if (response.episodeRatings) {
    dispatch(getPodcastRatingsSuccess(response));
  }
};
