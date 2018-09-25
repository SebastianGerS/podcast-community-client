import ActionTypes from './types';
import { Fetch } from '../../Helpers/Fetch';
import { atemptSetMessage } from '../Message';
import { atemptGetSelf } from '../Auth';
import { atemptGetSubscriptions } from '../User';


const startToggleSubscribtion = () => ({
  type: ActionTypes.TOGGLE_SUBSCRIPTION_START,
});

const subscribtionToggled = () => ({
  type: ActionTypes.TOGGLE_SUBSCRIPTION_SUCCESS,
});

const toggleSubscribtionFailure = () => ({
  type: ActionTypes.TOGGLE_SUBSCRIPTION_FAILUR,
});

const createEvent = body => Fetch('/events', 'POST', body);
/* eslint-disable import/prefer-default-export */
export const atemptToggleSubscribtion = (userId, podcastId) => async (dispatch) => {
  dispatch(startToggleSubscribtion());

  const event = {
    target: {
      kind: 'Podcast',
      item: podcastId,
    },
  };

  const response = await createEvent(event).catch(error => error);

  if (response.message === 'Failed to fetch') dispatch(atemptSetMessage({ message: 'unable to connect to resource pleas check your internet conection', type: 'error' }));

  if (response.error) {
    dispatch(toggleSubscribtionFailure());
    dispatch(atemptSetMessage({ message: response.error.errmsg, type: 'warning' }));
  }

  if (response.event) {
    dispatch(atemptGetSelf());
    dispatch(atemptSetMessage({ message: `Sucessfully ${response.event.type}d`, type: 'success' }));
    dispatch(subscribtionToggled());
    dispatch(atemptGetSubscriptions(userId));
  }
};
