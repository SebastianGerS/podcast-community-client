import actionTypes from './types';

export const play = () => ({
  type: actionTypes.START_PLAYBACK,
});

export const stop = () => ({
  type: actionTypes.STOP_PLAYBACK,
});

export const selectEpisode = (episode, src) => ({
  type: actionTypes.SET_EPISODE,
  episode,
  src,
});

export const setAudio = episode => async (dispatch) => {
  const src = `http://localhost:1337/audio/${episode.id}`;
  dispatch(selectEpisode(episode, src));
};
