import ActionTypes from '../Actions/Player/types';
import Episode from '../Models/Episode';


const DEFAULT_STATE = {
  isPlaying: false,
  startEpisode: false,
  episode: new Episode(),
  src: '',
  isDownloading: '',


};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.START_PLAYBACK:
      return { ...state, isPlaying: true, startEpisode: false };
    case ActionTypes.STOP_PLAYBACK:
      return { ...state, isPlaying: false, startEpisode: false };
    case ActionTypes.SET_EPISODE:
      return {
        ...state, episode: new Episode(action.episode), startEpisode: true, src: action.src,
      };
    case ActionTypes.DOWNLOAD_EPISODE_START:
      return {
        ...state, isDownloading: action.episodeId,
      };
    case ActionTypes.DOWNLOAD_EPISODE_SUCCESS:
      return {
        ...state, isDownloading: '',
      };
    case ActionTypes.DOWNLOAD_EPISODE_FAILURE:
      return {
        ...state, isDownloading: '',
      };
    default:
      return { ...state };
  }
}
