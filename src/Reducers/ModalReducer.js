import ActionTypes from '../Actions/Modal/types';

const DEFAULT_STATE = {
  loginModalIsActive: false,
  playbackModalIsActive: false,
  menuIsActive: false,
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_LOGIN_MODAL:
      return {
        loginModalIsActive: !state.loginModalIsActive,
        playbackModalIsActive: false,
        menuIsActive: false,
      };
    case ActionTypes.TOGGLE_PLAYBACK_MODAL:
      return {
        loginModalIsActive: false,
        playbackModalIsActive: !state.playbackModalIsActive,
        menuIsActive: false,
      };
    case ActionTypes.TOGGLE_MENU:
      return {
        loginModalIsActive: false,
        playbackModalIsActive: false,
        menuIsActive: !state.menuIsActive,
      };
    default:
      return { ...state };
  }
}
