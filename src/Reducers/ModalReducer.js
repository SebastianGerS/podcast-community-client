import ActionTypes from '../Actions/Modal/types';

const DEFAULT_STATE = {
  loginModalIsActive: false,
  playbackModalIsActive: false,
  menuIsActive: false,
  height: 0,
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        loginModalIsActive: !state.loginModalIsActive,
        playbackModalIsActive: false,
        menuIsActive: false,
      };
    case ActionTypes.TOGGLE_PLAYBACK_MODAL:
      return {
        ...state,
        loginModalIsActive: false,
        playbackModalIsActive: !state.playbackModalIsActive,
        menuIsActive: false,
      };
    case ActionTypes.TOGGLE_MENU:
      return {
        ...state,
        loginModalIsActive: false,
        playbackModalIsActive: false,
        menuIsActive: !state.menuIsActive,
      };
    case ActionTypes.SET_HEIGHT:
      return {
        ...state,
        height: action.height,
      };
    default:
      return { ...state };
  }
}
