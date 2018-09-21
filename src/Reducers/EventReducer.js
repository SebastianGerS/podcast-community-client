import ActionTypes from '../Actions/Event/types';

const DEFAULT_STATE = {
  isToggelingSubscription: false,
  isCreatingEvent: false,


};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_SUBSCRIPTION_START:
      return {
        ...state, isToggelingSubscription: true, isCreatingEvent: true,
      };
    case ActionTypes.TOGGLE_SUBSCRIPTION_SUCCESS:
      return {
        ...state, isToggelingSubscription: false, isCreatingEvent: false,
      };
    case ActionTypes.TOGGLE_SUBSCRIPTION_FAILUR:
      return {
        ...state, isToggelingSubscription: false, isCreatingEvent: false,
      };
    default:
      return { ...state };
  }
}
