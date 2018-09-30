import ActionTypes from '../Actions/Modal/types';

const DEFAULT_STATE = {
  loginModalIsActive: false,
  playbackModalIsActive: false,
  menuIsActive: false,
  userModalIsActive: false,
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
        userModalIsActive: false,
      };
    case ActionTypes.TOGGLE_PLAYBACK_MODAL:
      return {
        ...state,
        loginModalIsActive: false,
        userModalIsActive: false,
        playbackModalIsActive: !state.playbackModalIsActive,
        menuIsActive: false,
      };
    case ActionTypes.TOGGLE_MENU:
      return {
        ...state,
        loginModalIsActive: false,
        playbackModalIsActive: false,
        userModalIsActive: false,
        menuIsActive: !state.menuIsActive,
      };
    case ActionTypes.TOGGLE_USER_MODAL:
      return {
        ...state,
        loginModalIsActive: false,
        playbackModalIsActive: false,
        menuIsActive: false,
        userModalIsActive: !state.userModalIsActive,
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
