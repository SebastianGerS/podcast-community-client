import React from 'react';

interface Props {
  toggleMoreOptionsModal: () => void;
}

const MoreOptionsMenu = ({ toggleMoreOptionsModal }: Props): JSX.Element => (
  <div className="more-options-menu">
    <button
      className="close-more-options-modal-button"
      type="button"
      aria-label="close-more-options-modal-button"
      onClick={toggleMoreOptionsModal}
    />
    <nav>
      <ul>
        <li>
          <button
            className="open-recommend-modal-button"
            type="button"
            aria-label="open-recommend-modal-button"
          >
            Recommend
          </button>
        </li>
      </ul>
    </nav>
  </div>
);

export default MoreOptionsMenu;
