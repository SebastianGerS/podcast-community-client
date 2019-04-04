import React from 'react';

interface Props{
  targetUserId: string;
  remove: (targetUserId: string) => void;
}

function RemoveFollowerButton({ remove, targetUserId }: Props): JSX.Element {
  return (
    <button
      className="remove-follower-button"
      aria-label="remove-follower-button"
      type="button"
      onClick={() => remove(targetUserId)}
    />
  );
}

export default RemoveFollowerButton;
