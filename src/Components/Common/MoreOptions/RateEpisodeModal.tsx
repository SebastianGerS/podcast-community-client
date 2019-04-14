import React from 'react';
import Modal from '../../../Containers/Common/Modal';
import RateEpisode from '../../../Containers/Common/MoreOptions/RateEpisode';

function RateEpisodeModal(): JSX.Element {
  return (
    <Modal component={RateEpisode} size="smal" backgroundColor="black" />
  );
}

export default RateEpisodeModal;
