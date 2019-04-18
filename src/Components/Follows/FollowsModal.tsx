import React from 'react';
import Modal from '../../Containers/Common/Modal';
import FollowsList from '../../Containers/Follows/FollowsList';

const FollowsModal = (): JSX.Element => (<Modal component={FollowsList} size="smal" backgroundColor="black" />);

export default FollowsModal;
