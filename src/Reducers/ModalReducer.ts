import * as ActionTypes from '../Actions/Modal/types';
import { ModalActions } from '../Actions/Modal';

export interface ModalState {
  loginModalIsActive: boolean;
  playbackModalIsActive: boolean;
  menuIsActive: boolean;
  userModalIsActive: boolean;
  notificationsModalIsActive: boolean;
  moreOptionsModalIsActive: boolean;
  recommendToUserModalIsActive: boolean;
  height: number;
}

const DEFAULT_STATE: ModalState = {
  loginModalIsActive: false,
  playbackModalIsActive: false,
  menuIsActive: false,
  userModalIsActive: false,
  notificationsModalIsActive: false,
  moreOptionsModalIsActive: false,
  recommendToUserModalIsActive: false,
  height: 0,
};

export default function Modal(state: ModalState = DEFAULT_STATE, action: ModalActions): ModalState {
  switch (action.type) {
    case ActionTypes.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        loginModalIsActive: !state.loginModalIsActive,
        playbackModalIsActive: false,
        menuIsActive: false,
        userModalIsActive: false,
        notificationsModalIsActive: false,
        moreOptionsModalIsActive: false,
        recommendToUserModalIsActive: false,
      };
    case ActionTypes.TOGGLE_PLAYBACK_MODAL:
      return {
        ...state,
        loginModalIsActive: false,
        playbackModalIsActive: !state.playbackModalIsActive,
        menuIsActive: false,
        userModalIsActive: false,
        notificationsModalIsActive: false,
        moreOptionsModalIsActive: false,
        recommendToUserModalIsActive: false,
      };
    case ActionTypes.TOGGLE_MENU:
      return {
        ...state,
        loginModalIsActive: false,
        playbackModalIsActive: false,
        menuIsActive: !state.menuIsActive,
        userModalIsActive: false,
        notificationsModalIsActive: false,
        moreOptionsModalIsActive: false,
        recommendToUserModalIsActive: false,
      };
    case ActionTypes.TOGGLE_USER_MODAL:
      return {
        ...state,
        loginModalIsActive: false,
        playbackModalIsActive: false,
        menuIsActive: false,
        userModalIsActive: !state.userModalIsActive,
        notificationsModalIsActive: false,
        moreOptionsModalIsActive: false,
        recommendToUserModalIsActive: false,
      };
    case ActionTypes.TOGGLE_NOTIFICATIONS_MODAL:
      return {
        ...state,
        loginModalIsActive: false,
        playbackModalIsActive: false,
        menuIsActive: false,
        userModalIsActive: false,
        notificationsModalIsActive: !state.notificationsModalIsActive,
        moreOptionsModalIsActive: false,
        recommendToUserModalIsActive: false,
      };
    case ActionTypes.TOGGLE_MORE_OPTIONS_MODAL:
      return {
        ...state,
        loginModalIsActive: false,
        playbackModalIsActive: false,
        menuIsActive: false,
        userModalIsActive: false,
        notificationsModalIsActive: false,
        moreOptionsModalIsActive: !state.moreOptionsModalIsActive,
        recommendToUserModalIsActive: false,
      };
    case ActionTypes.TOGGLE_RECOMMEND_TO_USER_MODAL:
      return {
        ...state,
        loginModalIsActive: false,
        playbackModalIsActive: false,
        menuIsActive: false,
        userModalIsActive: false,
        notificationsModalIsActive: false,
        moreOptionsModalIsActive: false,
        recommendToUserModalIsActive: !state.recommendToUserModalIsActive,
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
