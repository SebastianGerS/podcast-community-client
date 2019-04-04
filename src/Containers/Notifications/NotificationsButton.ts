import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import NotificationsButton from '../../Components/Notifications/NotificationsButton';
import { toggleNotificationsModal, ToggleNotificationsModal } from '../../Actions/Modal';
import { NotificationState } from '../../Reducers/NotificationReducer';

interface State {
  NotificationReducer: NotificationState;
}

interface Props {
  numberOfUnobserved: number;
}

const mapStateToProps = ({ NotificationReducer }: State): Props => ({
  numberOfUnobserved: NotificationReducer.numberOfUnobserved,
});

interface DispatchProps {
  toggleNotificationsModal: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<ToggleNotificationsModal>): DispatchProps => ({
  toggleNotificationsModal: () => dispatch(toggleNotificationsModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsButton);
