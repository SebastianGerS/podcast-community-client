import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { Episode } from '../../../Models/Episode';

interface GetPodcastEpisodesStart {
  type: ActionTypes.GET_PODCAST_EPISODES_START;
}

export const startGetPodcastEpisodes = (): GetPodcastEpisodesStart => (
  {
    type: ActionTypes.GET_PODCAST_EPISODES_START,
  }
);

interface Results {
  morePages: boolean;
  next_offset: number;
  count: number;
  results: Episode[];
  total: number;
  term: string;
}

interface GetPodcastEpisodesSuccess {
  type: ActionTypes.GET_PODCAST_EPISODES_SUCCESS;
  data: Results;
}

export const gotPodcastEpisodes = (data: Results): GetPodcastEpisodesSuccess => (
  {
    type: ActionTypes.GET_PODCAST_EPISODES_SUCCESS,
    data,
  }
);

interface GetPodcastEpisodesFailure {
  type: ActionTypes.GET_PODCAST_EPISODES_FAILURE;
}

export const getPodcastEpisodesFailure = (): GetPodcastEpisodesFailure => (
  { type: ActionTypes.GET_PODCAST_EPISODES_FAILURE }
);

export type GetPodcastEpisodesAction = GetPodcastEpisodesStart | GetPodcastEpisodesSuccess | GetPodcastEpisodesFailure;

const getPodcastEpisodes = (path: string): Promise<Response> => Fetch(path, 'GET', {});

export interface EpisodesSearchData {
  term: string;
  offset: number;
  ocid: string;
}

type AttemptGetPodcastEpisodesAction = (dispatch: Dispatch< GetPodcastEpisodesAction|SetMessage>) => Promise<void>;

export const attemptGetPodcastEpisodes = (data: EpisodesSearchData): AttemptGetPodcastEpisodesAction => async (
  dispatch: Dispatch< GetPodcastEpisodesAction|SetMessage>,
): Promise<void> => {
  const {
    term, offset, ocid,
  } = data;

  dispatch(startGetPodcastEpisodes());

  const query = `/search?term=${term}&type=episode&offset=${offset}&sortByDate=${true}&ocid=${ocid}`;

  const response = await getPodcastEpisodes(query).catch(error => error);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(getPodcastEpisodesFailure());

    attemptSetMessage({ text: response.error.errmsg, type: 'info' })(dispatch);
  }
  if (response.results) dispatch(gotPodcastEpisodes(response));
};
