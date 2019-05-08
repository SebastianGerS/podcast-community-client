import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import App from '../App';
import { createSocket, SetSocket } from '../Actions/Auth';
import { checkIfResized, setHeight, SetHeight } from '../Actions/Modal';
import { AuthState } from '../Reducers/AuthReducer';
import { ModalState } from '../Reducers/ModalReducer';
import {
  GetNotificationsAction, attemptGetNotifications, AddNotificationActions, addNotification,
} from '../Actions/Notifications';
import { Notification } from '../Models/Notification';
import {
  attemptGetFollows, GetFollowsAction, updateFollowSessions, UpdateFollowSessions,
  SetFollowSessions, setFollowSessions, getFollowsSuccess, GetFollowsSuccess, Follows,
} from '../Actions/User';
import {
  attemptGetFollowingEvents, GetFollowingEventsAction, setEvent, SetEvent,
} from '../Actions/Event';
import { Event } from '../Models/Event';
import { Session } from '../Models/Session';

interface State {
  AuthReducer: AuthState;
  ModalReducer: ModalState;
}

interface StateProps {
  isLogedIn: boolean;
  height: number;
  socket: any;
  userId: string | StringConstructor;
}

function mapStateToProps({
  AuthReducer, ModalReducer,
}: State): StateProps {
  return {
    isLogedIn: AuthReducer.isLogedIn,
    height: ModalReducer.height,
    socket: AuthReducer.socket,
    userId: AuthReducer.user._id,
  };
}

type AppActions = (
  SetHeight | GetFollowsAction | SetEvent | UpdateFollowSessions
  | GetNotificationsAction | SetSocket | AddNotificationActions | GetFollowingEventsAction
  | SetFollowSessions | GetFollowsSuccess
);

interface DispatchProps {
  checkIfResized: () => void;
  setHeight: (height: number) => void;
  getNotifications: (offset: number) => void;
  createSocket: () => void;
  getFollows: () => void;
  addNotification: (notification: Notification) => void;
  getFollowingEvents: (offset: number) => void;
  setEvent: (event: Event) => void;
  updateFollowSessions: (session: Session) => void;
  setFollowSessions: (sessions: Session[]) => void;
  updateFollows: (follows: Follows) => void;
}

function mapDispatchToProps(dispatch: Dispatch<AppActions>): DispatchProps {
  return {
    checkIfResized: () => checkIfResized()(dispatch),
    setHeight: (height: number) => dispatch(setHeight(height)),
    getNotifications: (offset: number) => attemptGetNotifications(offset)(dispatch),
    createSocket: () => createSocket()(dispatch),
    getFollows: () => attemptGetFollows()(dispatch),
    addNotification: (notification: Notification) => addNotification(notification)(dispatch),
    getFollowingEvents: (offset: number) => attemptGetFollowingEvents(offset)(dispatch),
    setEvent: (event: Event) => dispatch(setEvent(event)),
    updateFollowSessions: (session: Session) => dispatch(updateFollowSessions(session)),
    setFollowSessions: (sessions: Session[]) => dispatch(setFollowSessions(sessions)),
    updateFollows: (follows: Follows) => dispatch(getFollowsSuccess(follows)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
