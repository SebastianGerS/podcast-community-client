import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Episode } from '../../Models/Episode';
import { Podcast } from '../../Models/Podcast';
import {
  setEpisode, SetEpisode, setPodcast, SetPodcast,
} from '../MoreOptions';


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

export interface ToggleNotificationsModal {
  type: ActionTypes.TOGGLE_NOTIFICATIONS_MODAL;
}

export const toggleNotificationsModal = (): ToggleNotificationsModal => ({
  type: ActionTypes.TOGGLE_NOTIFICATIONS_MODAL,
});

export interface ToggleMoreOptionsModal {
  type: ActionTypes.TOGGLE_MORE_OPTIONS_MODAL;
}

export const toggleMoreOptionsModal = (): ToggleMoreOptionsModal => ({
  type: ActionTypes.TOGGLE_MORE_OPTIONS_MODAL,
});

export interface ToggleRecommendToUserModal {
  type: ActionTypes.TOGGLE_RECOMMEND_TO_USER_MODAL;
}

export const toggleRecommendToUserModal = (): ToggleRecommendToUserModal => ({
  type: ActionTypes.TOGGLE_RECOMMEND_TO_USER_MODAL,
});

export interface ToggleRateEpisodeModal {
  type: ActionTypes.TOGGLE_RATE_EPISODE_MODAL;
}

export const toggleRateEpisodeModal = (): ToggleRateEpisodeModal => ({
  type: ActionTypes.TOGGLE_RATE_EPISODE_MODAL,
});

export interface ToggleFollowsModal {
  type: ActionTypes.TOGGLE_FOLLOWS_MODAL;
}

export const toggleFollowsModal = (): ToggleFollowsModal => ({
  type: ActionTypes.TOGGLE_FOLLOWS_MODAL,
});

export interface CloseAllModals {
  type: ActionTypes.CLOSE_ALL_MODALS;
}

export const closeAllModals = (): CloseAllModals => ({
  type: ActionTypes.CLOSE_ALL_MODALS,
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

export type SetAndToggleActions = SetPodcast | SetEpisode | ToggleMoreOptionsModal;

type SetAndToggleAction = (dispatch: Dispatch<SetAndToggleActions>) => void;

export const setAndToggleMoreOptionsModal = (item?: Episode | Podcast): SetAndToggleAction => (
  dispatch: Dispatch<SetAndToggleActions>,
): void => {
  if (item instanceof Episode) {
    dispatch(setEpisode(item));
  } else if (item instanceof Podcast) {
    dispatch(setPodcast(item));
  }
  dispatch(toggleMoreOptionsModal());
};

export type ModalActions = (
  ToggleLoginModal | ToggleMenu | TogglePlaybackModal | ToggleUserModal | ToggleNotificationsModal | CloseAllModals
  | ToggleMoreOptionsModal | ToggleRecommendToUserModal | ToggleRateEpisodeModal | SetHeight | ToggleFollowsModal
);
