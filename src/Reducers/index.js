import { combineReducers } from 'redux';
import Auth from './AuthReducer';
import Search from './SearchReducer';
import Message from './MessageReducer';
import Modal from './ModalReducer';

export default combineReducers({
  Auth,
  Search,
  Message,
  Modal,
});
