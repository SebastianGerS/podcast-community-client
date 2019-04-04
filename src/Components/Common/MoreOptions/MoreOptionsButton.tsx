import React from 'react';

interface Props {
  toggleMoreOptionsModal: () => void;
}

function MoreOptionsButton({ toggleMoreOptionsModal }: Props): JSX.Element {
  return (
    <button
      type="button"
      aria-label="more-options-button"
      className="more-options-button"
      onClick={toggleMoreOptionsModal}
    />
  );
}

export default MoreOptionsButton;
