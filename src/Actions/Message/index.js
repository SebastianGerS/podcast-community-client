import ActionTypes from './types';

export const setMessage = data => (
  {
    type: ActionTypes.SET_MESSAGE,
    data,
  }
);

export const removeMessage = () => (
  {
    type: ActionTypes.REMOVE_MESSAGE,
  }
);


export const atemptSetMessage = data => (dispatch) => {
  dispatch(setMessage(data));
};

export const atemptRemoveMessage = () => (dispatch) => {
  dispatch(removeMessage());
};
