import React from 'react';
import Modal from '../../Containers/Common/Modal';
import Notifications from '../../Containers/Notifications/Notifications';

function NotificationModal(): JSX.Element {
  return (
    <Modal component={Notifications} size="smal" backgroundColor="black" />
  );
}

export default NotificationModal;
