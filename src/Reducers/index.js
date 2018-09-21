import { combineReducers } from 'redux';
import Auth from './AuthReducer';
import Search from './SearchReducer';
import Message from './MessageReducer';
import Modal from './ModalReducer';
import Player from './PlayerReducer';
import User from './UserReducer';
import Event from './EventReducer';

export default combineReducers({
  Auth,
  Search,
  Message,
  Modal,
  Player,
  User,
  Event,
});
