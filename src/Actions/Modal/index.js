import actionTypes from './types';

export const toggleLoginModal = () => ({
  type: actionTypes.TOGGLE_LOGIN_MODAL,
});

export const togglePlaybackKModal = () => ({
  type: actionTypes.TOGGLE_PLAYBACK_MODAL,
});
export const toggleMenu = () => ({
  type: actionTypes.TOGGLE_MENU,
});
export const setHeight = height => ({
  type: actionTypes.SET_HEIGHT,
  height,
});
export const checkIfResized = () => (dispatch) => {
  window.addEventListener('resize', () => {
    dispatch(setHeight(window.innerHeight));
  });
};
