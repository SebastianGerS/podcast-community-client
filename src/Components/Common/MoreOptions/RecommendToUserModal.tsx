import React from 'react';
import Modal from '../../../Containers/Common/Modal';
import RecommendToUser from '../../../Containers/Common/MoreOptions/RecommendToUser';

function RecommendToUserModal(): JSX.Element {
  return (
    <Modal component={RecommendToUser} size="smal" backgroundColor="black" />
  );
}

export default RecommendToUserModal;
