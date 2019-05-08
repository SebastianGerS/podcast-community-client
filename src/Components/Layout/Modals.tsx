import React, { ComponentClass } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import LoginForm from '../../Containers/Auth/LoginForm';
import RateEpisode from '../../Containers/Common/MoreOptions/RateEpisode';
import RecommendToUser from '../../Containers/Common/MoreOptions/RecommendToUser';
import MoreOptionsMenu from '../../Containers/Common/MoreOptions/MoreOptionsMenu';
import Notifications from '../../Containers/Notifications/Notifications';
import FollowsList from '../../Containers/Follows/FollowsList';
import Modal from '../../Containers/Common/Modal';
import UserForm from '../../Containers/Admin/UserForm';

interface Props {
  loginModalIsActive: boolean;
  notificationsModalIsActive: boolean;
  moreOptionsModalIsActive: boolean;
  recommendToUserModalIsActive: boolean;
  rateEpisodeModalIsActive: boolean;
  followsModalIsActive: boolean;
  userModalIsActive: boolean;
  isLogedIn: boolean;
  isAdmin: boolean;
}

const Modals = ({
  loginModalIsActive, notificationsModalIsActive, moreOptionsModalIsActive, userModalIsActive,
  recommendToUserModalIsActive, rateEpisodeModalIsActive, followsModalIsActive, isLogedIn, isAdmin,
}: Props): JSX.Element | null => {
  let component: ComponentClass | null = null;

  if (isLogedIn) {
    if (notificationsModalIsActive) {
      component = Notifications;
    } else if (moreOptionsModalIsActive) {
      component = MoreOptionsMenu;
    } else if (recommendToUserModalIsActive) {
      component = RecommendToUser;
    } else if (rateEpisodeModalIsActive) {
      component = RateEpisode;
    } else if (followsModalIsActive) {
      component = FollowsList;
    } else if (isAdmin && userModalIsActive) {
      component = UserForm;
    }
  } else if (loginModalIsActive) {
    component = LoginForm;
  }

  return (
    <TransitionGroup component={null}>
      { component
        ? (
          <CSSTransition
            in={false}
            appear
            timeout={725}
            classNames="modal"
          >
            <Modal component={component} size="smal" backgroundColor="black" />
          </CSSTransition>
        )
        : null
      }
    </TransitionGroup>
  );
};

export default Modals;
