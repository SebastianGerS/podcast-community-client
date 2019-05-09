import React from 'react';
import { Episode } from '../../../Models/Episode';
import { Podcast } from '../../../Models/Podcast';

interface Props {
  setAndToggleMoreOptionsModal: (item: Episode | Podcast) => void;
  toggleLoginModal: () => void;
  isLogedin: boolean;
  item: Episode | Podcast;
}

function MoreOptionsButton({
  setAndToggleMoreOptionsModal, toggleLoginModal, item, isLogedin,
}: Props): JSX.Element {
  return (
    <button
      title="more options"
      type="button"
      aria-label="more-options-button"
      className="more-options-button"
      onClick={isLogedin ? () => setAndToggleMoreOptionsModal(item) : () => toggleLoginModal()}
    />
  );
}

export default MoreOptionsButton;
