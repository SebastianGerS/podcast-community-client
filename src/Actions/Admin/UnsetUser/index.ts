import * as actionTypes from './types';

export interface UnsetUser {
  type: actionTypes.UNSET_USER;
}

export const unsetUser = (): UnsetUser => ({
  type: actionTypes.UNSET_USER,
});
