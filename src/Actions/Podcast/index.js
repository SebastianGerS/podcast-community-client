import ActionTypes from './types';
import { Fetch } from '../../Helpers/Fetch';
import { atemptSetMessage } from '../Message';

const startGetTopPodcasts = podcasts => ({
  type: ActionTypes.GET_TOP_PODCASTS_START,
  podcasts,
});

const gotTopPodcasts = podcasts => ({
  type: ActionTypes.GET_TOP_PODCASTS_SUCCESS,
  podcasts,
});


const getTopPodcastsFailure = podcasts => ({
  type: ActionTypes.GET_TOP_PODCASTS_FAILURE,
  podcasts,
});

const getTopPodcasts = () => Fetch('/toplist', 'GET', {});

const atemptGetTopPodcasts = () => async (dispatch) => {
  dispatch(startGetTopPodcasts());
  const response = await getTopPodcasts().catch(error => error);

  if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ text: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

  if (response.error) {
    dispatch(getTopPodcastsFailure());

    dispatch(atemptSetMessage({ text: response.error.errmsg, type: 'info' }));
  }

  if (response.length !== 0 && !response.error && !response.message) {
    dispatch(gotTopPodcasts(response));
  }
};
export default atemptGetTopPodcasts;
