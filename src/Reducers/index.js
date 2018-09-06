import { combineReducers } from 'redux';
import Auth from './AuthReducer';
import Search from './SearchReducer';

export default combineReducers({
  Auth,
  Search,
});
