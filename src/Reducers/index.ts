import { combineReducers } from 'redux';
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

export default combineReducers({
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
});
