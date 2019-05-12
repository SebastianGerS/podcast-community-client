import React from 'react';

interface Props {
  toggleLoginModal: () => void;
}

const LoginButton = ({ toggleLoginModal }: Props): JSX.Element => (
  <div className="login-button">
    <button title="login" type="button" name="toggle-login-modal-button" onClick={toggleLoginModal}>Login</button>
  </div>
);

export default LoginButton;
