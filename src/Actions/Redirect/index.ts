import * as ActionTypes from './types';
import { RedirectModel } from '../../Models/Redirect';

export interface SetRedirect {
  type: ActionTypes.SET_REDIRECT;
  redirect: RedirectModel;
}

export const setRedirect = (redirect: RedirectModel): SetRedirect => ({
  type: ActionTypes.SET_REDIRECT,
  redirect,
});

export interface UnsetRedirect {
  type: ActionTypes.UNSET_REDIRECT;
}

export const unsetRedirect = (): UnsetRedirect => ({
  type: ActionTypes.UNSET_REDIRECT,
});

export type RedirectActions = SetRedirect | UnsetRedirect;
