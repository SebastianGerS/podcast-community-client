import React from 'react';
import Modal from '../../../Containers/Common/Modal';
import MoreOptionsMenu from '../../../Containers/Common/MoreOptions/MoreOptionsMenu';

function MoreOptionsModal(): JSX.Element {
  return (
    <Modal component={MoreOptionsMenu} size="smal" backgroundColor="black" />
  );
}

export default MoreOptionsModal;
