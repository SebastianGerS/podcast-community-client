/* eslint-disable import/prefer-default-export */

export const logout = () => {
  localStorage.removeItem('token');
  if (!localStorage.getItem('token')) {
    return true;
  }
  return false;
};
