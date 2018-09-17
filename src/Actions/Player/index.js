import actionTypes from './types';

export const play = () => ({
  type: actionTypes.START_PLAYBACK,
});

export const stop = () => ({
  type: actionTypes.STOP_PLAYBACK,
});

export const selectEpisode = episode => ({
  type: actionTypes.SET_EPISODE,
  episode,
});
