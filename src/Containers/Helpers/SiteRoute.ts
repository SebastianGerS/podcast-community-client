import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SiteRoute from '../../Helpers/SiteRoute';
import {
  checkIfLogedIn, UserLogoutSuccess, IsLogedIn, attemptCreateSocket, CreateSocket,
} from '../../Actions/Auth';
import { checkIfResized, setHeight, SetHeight } from '../../Actions/Modal';
import { AuthState } from '../../Reducers/AuthReducer';
import { ModalState } from '../../Reducers/ModalReducer';
import { UnsetRedirect, unsetRedirect } from '../../Actions/Redirect';
import { GetNotificationsAction, attemptGetNotifications, AddNotificationActions } from '../../Actions/Notifications';
import { NotificationState } from '../../Reducers/NotificationReducer';
import { Notification } from '../../Models/Notification';
import { attemptGetFollows, GetFollowsAction } from '../../Actions/User';

interface State {
  AuthReducer: AuthState;
  ModalReducer: ModalState;
  NotificationReducer: NotificationState;
}

interface StateProps {
  isLogedIn: boolean;
  isAdmin: boolean;
  height: number;
  notifications: Notification[];
  socket: any;
  userId: string | StringConstructor;
}

function mapStateToProps({ AuthReducer, ModalReducer, NotificationReducer }: State): StateProps {
  return {
    isLogedIn: AuthReducer.isLogedIn,
    isAdmin: AuthReducer.isAdmin,
    height: ModalReducer.height,
    notifications: NotificationReducer.notifications,
    socket: AuthReducer.socket,
    userId: AuthReducer.user._id,
  };
}

type SiteRouteActions = (
  UserLogoutSuccess | IsLogedIn | SetHeight | UnsetRedirect | GetFollowsAction
  | GetNotificationsAction | CreateSocket | AddNotificationActions
);

interface DispatchProps {
  checkIfLogedIn: () => void;
  checkIfResized: () => void;
  setHeight: (height: number) => void;
  unsetRedirect: () => void;
  getNotifications: (offset: number) => void;
  createSocket: (userId: string) => void;
  getFollows: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<SiteRouteActions>): DispatchProps {
  return {
    checkIfLogedIn: () => checkIfLogedIn()(dispatch),
    checkIfResized: () => checkIfResized()(dispatch),
    setHeight: (height: number) => dispatch(setHeight(height)),
    unsetRedirect: () => dispatch(unsetRedirect()),
    getNotifications: (offset: number) => attemptGetNotifications(offset)(dispatch),
    createSocket: (userId: string) => attemptCreateSocket(userId)(dispatch),
    getFollows: () => attemptGetFollows()(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteRoute);
