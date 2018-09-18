import ActionTypes from '../Actions/Player/types';
import Episode from '../Models/Episode';


const DEFAULT_STATE = {
  isPlaying: false,
  startEpisode: false,
  episode: new Episode(),
  src: '',

};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.START_PLAYBACK:
      return { ...state, isPlaying: true, startEpisode: false };
    case ActionTypes.STOP_PLAYBACK:
      return { ...state, isPlaying: false };
    case ActionTypes.SET_EPISODE:
      return {
        ...state, episode: new Episode(action.episode), startEpisode: true, src: action.src,
      };
    default:
      return { ...state };
  }
}
