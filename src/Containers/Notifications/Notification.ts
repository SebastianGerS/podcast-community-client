import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import NotificationComponent from '../../Components/Notifications/Notification';
import {
  attemptDeleteNotification, DeleteNotificationAction, attemptUpdateNotification, UpdateNotificationAction,
} from '../../Actions/Notifications';
import { toggleNotificationsModal, ToggleNotificationsModal } from '../../Actions/Modal';
import { Notification } from '../../Models/Notification';
import { SetMessage } from '../../Actions/Message';

interface DispatchProps {
  deleteNotification: (notification: Notification) => void;
  updateNotification: (notificationId: string) => void;
  toggleNotificationsModal: () => void;
}

type NotificationComponentActions = (
  DeleteNotificationAction | UpdateNotificationAction | SetMessage | ToggleNotificationsModal
);

const mapDispatchToProps = (dispatch: Dispatch<NotificationComponentActions>): DispatchProps => ({
  deleteNotification: (notification: Notification) => attemptDeleteNotification(notification)(dispatch),
  updateNotification: (notificationId: string) => attemptUpdateNotification(notificationId)(dispatch),
  toggleNotificationsModal: () => dispatch(toggleNotificationsModal()),
});

export default connect(null, mapDispatchToProps)(NotificationComponent);
