import React from 'react';
import LoginModal from '../Auth/LoginModal';
import RateEpisodeModal from '../Common/MoreOptions/RateEpisodeModal';
import RecommendToUserModal from '../Common/MoreOptions/RecommendToUserModal';
import MoreOptionsModal from '../Common/MoreOptions/MoreOptionsModal';
import NotificationsModal from '../Notifications/NotificationsModal';
import FollowsModal from '../Follows/FollowsModal';

interface Props {
  loginModalIsActive: boolean;
  notificationsModalIsActive: boolean;
  moreOptionsModalIsActive: boolean;
  recommendToUserModalIsActive: boolean;
  rateEpisodeModalIsActive: boolean;
  followsModalIsActive: boolean;
  isLogedIn: boolean;
}

const Modals = ({
  loginModalIsActive, notificationsModalIsActive, moreOptionsModalIsActive,
  recommendToUserModalIsActive, rateEpisodeModalIsActive, isLogedIn, followsModalIsActive,
}: Props): JSX.Element | null => {
  let modal = null;
  if (isLogedIn) {
    if (notificationsModalIsActive) {
      modal = <NotificationsModal />;
    } else if (moreOptionsModalIsActive) {
      modal = <MoreOptionsModal />;
    } else if (recommendToUserModalIsActive) {
      modal = <RecommendToUserModal />;
    } else if (rateEpisodeModalIsActive) {
      modal = <RateEpisodeModal />;
    } else if (followsModalIsActive) {
      modal = <FollowsModal />;
    }
  } else if (loginModalIsActive) {
    modal = <LoginModal />;
  }

  return modal;
};

export default Modals;
