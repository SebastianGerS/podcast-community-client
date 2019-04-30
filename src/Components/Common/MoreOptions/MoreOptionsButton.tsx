import React from 'react';
import { Episode } from '../../../Models/Episode';
import { Podcast } from '../../../Models/Podcast';

interface Props {
  setAndToggleMoreOptionsModal: (item: Episode | Podcast) => void;
  item: Episode | Podcast;
}

function MoreOptionsButton({ setAndToggleMoreOptionsModal, item }: Props): JSX.Element {
  return (
    <button
      title="more options"
      type="button"
      aria-label="more-options-button"
      className="more-options-button"
      onClick={() => setAndToggleMoreOptionsModal(item)}
    />
  );
}

export default MoreOptionsButton;
