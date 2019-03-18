import { Dispatch } from 'redux';
import * as ActionTypes from './types';

export interface ToggleLoginModal {
  type: ActionTypes.TOGGLE_LOGIN_MODAL;
}

export const toggleLoginModal = (): ToggleLoginModal => ({
  type: ActionTypes.TOGGLE_LOGIN_MODAL,
});

export interface TogglePlaybackModal {
  type: ActionTypes.TOGGLE_PLAYBACK_MODAL;
}

export const togglePlaybackKModal = (): TogglePlaybackModal => ({
  type: ActionTypes.TOGGLE_PLAYBACK_MODAL,
});

export interface ToggleMenu {
  type: ActionTypes.TOGGLE_MENU;
}

export const toggleMenu = (): ToggleMenu => ({
  type: ActionTypes.TOGGLE_MENU,
});

export interface ToggleUserModal {
  type: ActionTypes.TOGGLE_USER_MODAL;
}

export const toggleUserModal = (): ToggleUserModal => ({
  type: ActionTypes.TOGGLE_USER_MODAL,
});

export interface SetHeight {
  type: ActionTypes.SET_HEIGHT;
  height: number;
}

export const setHeight = (height: number): SetHeight => ({
  type: ActionTypes.SET_HEIGHT,
  height,
});

type CheckIfResizedAction = (dispatch: Dispatch<SetHeight>) => void;

export const checkIfResized = (): CheckIfResizedAction => (dispatch: Dispatch<SetHeight>): void => {
  window.addEventListener('resize', () => {
    dispatch(setHeight(window.innerHeight));
  });
};

export type ModalActions = ToggleLoginModal | ToggleMenu | TogglePlaybackModal | ToggleUserModal | SetHeight;
