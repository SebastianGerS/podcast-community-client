import * as ActionTypes from '../Actions/Redirect/types';
import { RedirectModel } from '../Models/Redirect';
import { RedirectActions } from '../Actions/Redirect';

export interface RedirectState {
  redirect: RedirectModel;
}
const DEFAULT_STATE: RedirectState = {
  redirect: new RedirectModel(),
};

export default function (state: RedirectState = DEFAULT_STATE, action: RedirectActions): RedirectState {
  switch (action.type) {
    case ActionTypes.SET_REDIRECT:
      return { redirect: new RedirectModel(action.redirect) };
    case ActionTypes.UNSET_REDIRECT:
      return { redirect: new RedirectModel() };
    default:
      return { ...state };
  }
}
