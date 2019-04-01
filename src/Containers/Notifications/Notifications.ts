import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import NotificationsComponent from '../../Components/Notifications/Notifications';
import { attemptGetNotifications, GetNotificationsAction } from '../../Actions/Notifications';
import { NotificationState } from '../../Reducers/NotificationReducer';
import { Notification } from '../../Models/Notification';

interface State {
  NotificationReducer: NotificationState;
}

interface Props {
  notifications: Notification[];
  nextOffset: number;
  morePages: boolean;
}

const mapStateToProps = ({ NotificationReducer }: State): Props => ({
  notifications: NotificationReducer.notifications,
  nextOffset: NotificationReducer.nextOffset,
  morePages: NotificationReducer.morePages,
});

interface DispatchProps {
  getNotifications: (offset: number) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<GetNotificationsAction>): DispatchProps => ({
  getNotifications: (offset: number) => attemptGetNotifications(offset)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent);
