import React, { useState, FormEvent } from 'react';
import { scrollToTop } from '../../Helpers/UserAgent';
import { invalidEmail, invalidPassword } from '../../Helpers/Validation';

interface Props {
  attemptLogin: (data: object) => void;
  closeLoginModal: () => void;
}

function LoginForm({ attemptLogin, closeLoginModal }: Props): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    scrollToTop();
    attemptLogin({ email, password });
  };

  return (
    <div className="login-modal">
      <button
        className="close-login-modal-button"
        type="button"
        aria-label="close-login-modal-button"
        onClick={closeLoginModal}
      />
      <form className="login-form" onSubmit={login}>
        <label htmlFor="email">
      Email:
          <input
            type="text"
            name="email"
            id="email"
            className={invalidEmail(email) ? 'invalid' : 'valid'}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="password">
      Password:
          <input
            type="password"
            name="password"
            id="password"
            className={invalidPassword(password) ? 'invalid' : 'valid'}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
