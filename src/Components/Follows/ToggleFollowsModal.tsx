import React, { useEffect } from 'react';

interface Props {
  toggleFollowsModal: () => void;
  followsOnline: boolean;
  socket: any;
  userId: string | StringConstructor;
  follows: number;
}

function ToggleFollowsModal({
  toggleFollowsModal, followsOnline, socket, userId, follows,
}: Props): JSX.Element {
  useEffect(() => {
    if (socket) {
      socket.emit('user/follows/status', userId);
    }
  }, [follows]);

  return (
    <button
      type="button"
      aria-label="toggle-follows-modal"
      className={`toggle-follows-modal ${followsOnline ? 'online' : 'offline'}`}
      onClick={() => toggleFollowsModal()}
    />
  );
}

export default ToggleFollowsModal;
