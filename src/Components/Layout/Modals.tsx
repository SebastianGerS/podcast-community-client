import React, { CSSProperties, ComponentClass } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import LoginForm from '../../Containers/Auth/LoginForm';
import RateEpisode from '../../Containers/Common/MoreOptions/RateEpisode';
import RecommendToUser from '../../Containers/Common/MoreOptions/RecommendToUser';
import MoreOptionsMenu from '../../Containers/Common/MoreOptions/MoreOptionsMenu';
import Notifications from '../../Containers/Notifications/Notifications';
import FollowsList from '../../Containers/Follows/FollowsList';
import Modal from '../../Containers/Common/Modal';

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
  let component: ComponentClass | null = null;
  let flipKey = null;
  if (isLogedIn) {
    if (notificationsModalIsActive) {
      component = Notifications;
      flipKey = Notifications.displayName;
    } else if (moreOptionsModalIsActive) {
      component = MoreOptionsMenu;
      flipKey = MoreOptionsMenu.displayName;
    } else if (recommendToUserModalIsActive) {
      component = RecommendToUser;
      flipKey = RecommendToUser.displayName;
    } else if (rateEpisodeModalIsActive) {
      component = RateEpisode;
      flipKey = RateEpisode.displayName;
    } else if (followsModalIsActive) {
      component = FollowsList;
      flipKey = FollowsList.displayName;
    }
  } else if (loginModalIsActive) {
    component = LoginForm;
    flipKey = LoginForm.displayName;
  }

  const styles: CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: 0,
    height: 0,
  };

  return (
    <Flipper flipKey={flipKey}>
      {component
        ? (
          <Flipped flipId="modal">
            { flippedProps => (
              <Modal
                component={component}
                size="smal"
                backgroundColor="black"
                flippedProps={flippedProps}
              />
            )
            }
          </Flipped>
        )
        : <Flipped flipId="modal"><div style={styles} /></Flipped>
      }
    </Flipper>
  );
};

export default Modals;
