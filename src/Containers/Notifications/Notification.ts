import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import NotificationComponent from '../../Components/Notifications/Notification';
import { attemptDeleteNotification, DeleteNotificationAction } from '../../Actions/Notifications';
import { Notification } from '../../Models/Notification';

interface DispatchProps {
  deleteNotification: (notification: Notification) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<DeleteNotificationAction>): DispatchProps => ({
  deleteNotification: (notification: Notification) => attemptDeleteNotification(notification)(dispatch),
});

export default connect(null, mapDispatchToProps)(NotificationComponent);
