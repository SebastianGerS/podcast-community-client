import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';

interface GetPodcastEpisodeRatingStart {
  type: ActionTypes.GET_PODCAST_EPISODE_RATING_START;
}

const startGetPodcastEpisodeRating = (): GetPodcastEpisodeRatingStart => ({
  type: ActionTypes.GET_PODCAST_EPISODE_RATING_START,
});

interface EpisodeRating {
  episodeId: string;
  rating: number;
}

interface GetPodcastEpisodeRatingSuccess extends EpisodeRating{
  type: ActionTypes.GET_PODCAST_EPISODE_RATING_SUCCESS;
}

const getPodcastEpisodeRatingSuccess = ({ episodeId, rating }: EpisodeRating): GetPodcastEpisodeRatingSuccess => ({
  type: ActionTypes.GET_PODCAST_EPISODE_RATING_SUCCESS,
  episodeId,
  rating,
});

interface GetPodcastEpisodeRatingFailure {
  type: ActionTypes.GET_PODCAST_EPISODE_RATING_FAILURE;
}

const getPodcastEpisodeRatingFailure = (): GetPodcastEpisodeRatingFailure => ({
  type: ActionTypes.GET_PODCAST_EPISODE_RATING_FAILURE,
});

const getPodcastEpisodeRating = (episodeId: string): Promise<Response> => (
  Fetch(`/episodes/${episodeId}/rating`, 'GET', {})
);

export type GetPodcastEpisodeRatingAction = (
  GetPodcastEpisodeRatingStart | GetPodcastEpisodeRatingSuccess | GetPodcastEpisodeRatingFailure
);

type AttemptGetPodcastEpisodeRatingAction = (
  (dispatch: Dispatch<GetPodcastEpisodeRatingAction | SetMessage>) => Promise<void>
);

export const attemptGetPodcastEpisodeRating = (episodeId: string): AttemptGetPodcastEpisodeRatingAction => async (
  dispatch: Dispatch<GetPodcastEpisodeRatingAction | SetMessage>,
): Promise<void> => {
  dispatch(startGetPodcastEpisodeRating());

  const response = await getPodcastEpisodeRating(episodeId).catch(error => error);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getPodcastEpisodeRatingFailure());
  }

  if (response.rating) {
    dispatch(getPodcastEpisodeRatingSuccess({ episodeId, rating: response.rating }));
  }
};
