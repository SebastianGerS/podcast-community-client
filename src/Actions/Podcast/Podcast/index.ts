import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { Podcast } from '../../../Models/Podcast';
import { setRedirect, SetRedirect } from '../../Redirect';
import { Rating } from '../../../Models/Rating';

interface GetPodcastStart {
  type: ActionTypes.GET_PODCAST_START;
}

const startGetPodcast = (): GetPodcastStart => ({
  type: ActionTypes.GET_PODCAST_START,
});
interface PodcastData {
  podcast: Podcast;
  ratings: {
    episodeRatings: Rating[];
    avrageRating: number;
  };
}
interface GetPodcastSuccess extends PodcastData{
  type: ActionTypes.GET_PODCAST_SUCCESS;
}

const gotPodcast = ({ podcast, ratings }: PodcastData): GetPodcastSuccess => ({
  type: ActionTypes.GET_PODCAST_SUCCESS,
  podcast,
  ratings,
});

interface GetPodcastFailure {
  type: ActionTypes.GET_PODCAST_FAILURE;
}

const getPodcastFailure = (): GetPodcastFailure => ({
  type: ActionTypes.GET_PODCAST_FAILURE,
});

const getPodcast = (podcastId: string): Promise<Response> => Fetch(`/podcasts/${podcastId}`, 'GET', {});

export type GetPodcastAction = GetPodcastStart | GetPodcastSuccess |GetPodcastFailure | SetRedirect;

type AttemptGetPodcastAction = (dispatch: Dispatch<GetPodcastAction | SetMessage>) => Promise<void>;

export const attemptGetPodcast = (podcastId: string): AttemptGetPodcastAction => async (
  dispatch: Dispatch<GetPodcastAction | SetMessage>,
): Promise<void> => {
  dispatch(startGetPodcast());

  const response = await getPodcast(podcastId).catch(error => error);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getPodcastFailure());
    dispatch(setRedirect({ to: '/podcasts' }));
    attemptSetMessage({ text: response.error.errmsg, type: 'info' })(dispatch);
  }

  if (response.length !== 0 && !response.error && !response.message) {
    dispatch(gotPodcast(response));
  }
};
