import { combineReducers } from 'redux';
import * as ActionTypes from '../Actions/Auth/types';
import { AuthActions } from '../Actions/Auth';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer';
import MessageReducer from './MessageReducer';
import ModalReducer from './ModalReducer';
import PlayerReducer from './PlayerReducer';
import UserReducer from './UserReducer';
import EventReducer from './EventReducer';
import PodcastReducer from './PodcastReducer';
import AdminReducer from './AdminReducer';
import EpisodeReducer from './EpisodeReducer';
import RedirectReducer from './RedirectReducer';
import NotificationReducer from './NotificationReducer';
import MoreOptionsReducer from './MoreOptionsReducer';

const AppReducer = combineReducers({
  AuthReducer,
  SearchReducer,
  MessageReducer,
  ModalReducer,
  PlayerReducer,
  UserReducer,
  EventReducer,
  PodcastReducer,
  AdminReducer,
  EpisodeReducer,
  RedirectReducer,
  NotificationReducer,
  MoreOptionsReducer,
});

export default function RootReducer(state: any, action: AuthActions): any {
  let currentState = state;

  if (action.type === ActionTypes.USER_LOGOUT_SUCCESS) {
    state.AuthReducer.socket.close();
    currentState = undefined;
  }

  return AppReducer(currentState, action);
}
