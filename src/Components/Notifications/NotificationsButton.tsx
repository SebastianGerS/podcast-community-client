import React from 'react';

interface Props {
  numberOfUnobserved: number;
  toggleNotificationsModal: () => void;
}

const NotificationsButton = ({ numberOfUnobserved, toggleNotificationsModal }: Props): JSX.Element => (
  <div className="notifications-button">
    <button
      className={numberOfUnobserved > 0 ? 'has-new-notifications' : 'no-new-notifications'}
      type="button"
      aria-label="toggle-notifications"
      onClick={toggleNotificationsModal}
    />
  </div>
);

export default NotificationsButton;
