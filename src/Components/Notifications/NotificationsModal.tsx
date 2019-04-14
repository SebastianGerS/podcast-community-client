import React from 'react';
import Modal from '../../Containers/Common/Modal';
import Notifications from '../../Containers/Notifications/Notifications';

function NotificationsModal(): JSX.Element {
  return (
    <Modal component={Notifications} size="smal" backgroundColor="black" />
  );
}

export default NotificationsModal;
