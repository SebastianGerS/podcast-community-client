import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { Podcast } from '../../../Models/Podcast';
import { setRedirect, SetRedirect } from '../../Redirect';
import { Episode } from '../../../Models/Episode';

interface GetPodcastStart {
  type: ActionTypes.GET_PODCAST_START;
  isFetchingPodcast: boolean;
}

const startGetPodcast = (isFetchingPodcast: boolean): GetPodcastStart => ({
  type: ActionTypes.GET_PODCAST_START,
  isFetchingPodcast,
});

interface GetPodcastRespose {
  podcast?: Podcast;
  episodes: Episode[];
  morePages: boolean;
  nextOffset: number;
}
interface GetPodcastSuccess extends GetPodcastRespose {
  type: ActionTypes.GET_PODCAST_SUCCESS;
}

const gotPodcast = ({
  podcast, episodes, morePages, nextOffset,
}: GetPodcastRespose): GetPodcastSuccess => ({
  type: ActionTypes.GET_PODCAST_SUCCESS,
  podcast,
  episodes,
  morePages,
  nextOffset,
});

interface GetPodcastFailure {
  type: ActionTypes.GET_PODCAST_FAILURE;
}

const getPodcastFailure = (): GetPodcastFailure => ({
  type: ActionTypes.GET_PODCAST_FAILURE,
});

const getPodcast = (podcastId: string, nextOffset?: number): Promise<Response> => (
  Fetch(`/podcasts/${podcastId}${nextOffset ? `?offset=${nextOffset}` : ''}`, 'GET', {})
);

export type GetPodcastAction = GetPodcastStart | GetPodcastSuccess |GetPodcastFailure | SetRedirect;

type AttemptGetPodcastAction = (dispatch: Dispatch<GetPodcastAction | SetMessage>) => Promise<void>;

export const attemptGetPodcast = (podcastId: string, nextOffset?: number): AttemptGetPodcastAction => async (
  dispatch: Dispatch<GetPodcastAction | SetMessage>,
): Promise<void> => {
  dispatch(startGetPodcast(!nextOffset));

  const response = await getPodcast(podcastId, nextOffset).catch(error => error);

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
  }

  if (response.length !== 0 && !response.error && !response.message) {
    dispatch(gotPodcast(response));
  }
};
