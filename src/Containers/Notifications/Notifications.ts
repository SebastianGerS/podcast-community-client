import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import NotificationsComponent from '../../Components/Notifications/Notifications';
import { attemptGetNotifications, GetNotificationsAction } from '../../Actions/Notifications';
import { NotificationState } from '../../Reducers/NotificationReducer';
import { Notification } from '../../Models/Notification';
import { toggleNotificationsModal, ToggleNotificationsModal } from '../../Actions/Modal';

interface State {
  NotificationReducer: NotificationState;
}

interface Props {
  notifications: Notification[];
  nextOffset: number;
  morePages: boolean;
  total: number;
}

const mapStateToProps = ({ NotificationReducer }: State): Props => ({
  notifications: NotificationReducer.notifications,
  nextOffset: NotificationReducer.nextOffset,
  morePages: NotificationReducer.morePages,
  total: NotificationReducer.total,
});

interface DispatchProps {
  getNotifications: (offset: number) => void;
  closeNotificationsModal: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<GetNotificationsAction|ToggleNotificationsModal>): DispatchProps => ({
  getNotifications: (offset: number) => attemptGetNotifications(offset)(dispatch),
  closeNotificationsModal: () => dispatch(toggleNotificationsModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent);
