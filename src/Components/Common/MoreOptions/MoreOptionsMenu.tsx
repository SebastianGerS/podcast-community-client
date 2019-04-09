import React from 'react';
import { Podcast } from '../../../Models/Podcast';
import { Episode } from '../../../Models/Episode';
import Config from '../../../Config/config';

interface Props {
  toggleMoreOptionsModal: () => void;
  toggleRecommendToUserModal: () => void;
  toggleRateEpisodeModal: () => void;
  episode?: Episode;
  podcast?: Podcast;
}

function MoreOptionsMenu({
  toggleMoreOptionsModal, toggleRecommendToUserModal, toggleRateEpisodeModal, episode, podcast,
}: Props): JSX.Element {
  const item = episode || podcast;

  const CopyToClipBoard = (): void => {
    const textField = document.createElement('textarea');
    const type = item instanceof Episode ? 'episodes' : 'podcasts';
    const itemId = item ? item.id : '';

    textField.innerText = `${Config.CLIENT_BASE_URL}/${type}/${itemId}`;

    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };

  return (
    <div className="more-options-menu">
      <button
        className="close-more-options-modal-button"
        type="button"
        aria-label="close-more-options-modal-button"
        onClick={toggleMoreOptionsModal}
      />
      <nav>
        <ul>
          {item instanceof Episode
            && (
              <li>
                <button
                  className="open-recommend-modal-button"
                  type="button"
                  aria-label="open-recommend-modal-button"
                  onClick={toggleRateEpisodeModal}
                >
                  Rate
                </button>
              </li>
            )
          }
          <li>
            <button
              className="open-recommend-modal-button"
              type="button"
              aria-label="open-recommend-modal-button"
              onClick={toggleRecommendToUserModal}
            >
              Recommend
            </button>
          </li>
          <li>
            <button
              className="open-recommend-modal-button"
              type="button"
              aria-label="open-recommend-modal-button"
              onClick={CopyToClipBoard}
            >
              Share
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MoreOptionsMenu;
