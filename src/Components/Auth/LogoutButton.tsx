import React from 'react';
import { scrollToTop } from '../../Helpers/UserAgent';

interface Props {
  atemptLogout: () => void;
  isLogedIn: boolean;
}

function LogoutButton({ atemptLogout, isLogedIn }: Props): JSX.Element | null {
  function logout(): void {
    atemptLogout();
    scrollToTop();
  }

  return isLogedIn ? (
    <li><button type="button" className="logout-button" onClick={logout}>Logout</button></li>
  ) : null;
}

export default LogoutButton;
