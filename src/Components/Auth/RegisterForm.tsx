import React, { useState, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import {
  invalidEmail, invalidPassword, invalidUsername, invalidPasswordConfirmation,
} from '../../Helpers/Validation';
import { RedirectModel } from '../../Models/Redirect';

interface Props {
  attemptRegister: (user: object) => void;
  redirect: RedirectModel;
}

function RegisterForm({ attemptRegister, redirect }: Props): JSX.Element {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('private');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const register = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
      passwordConfirmation,
      type,
    };

    attemptRegister(user);
  };

  const renderRedirect = (): JSX.Element | null => (
    typeof redirect.to === 'string' ? <Redirect to={redirect.to} /> : null
  );

  /* eslint-disable jsx-a11y/label-has-for */
  return (
    <form className="register-form" onSubmit={register}>
      {renderRedirect()}
      <label htmlFor="username">
      Username:
        <input
          type="text"
          className={invalidUsername(username) ? 'invalid' : 'valid'}
          name="username"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </label>
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
      <label htmlFor="type">
      Account Type:
        <select name="type" id="type" value={type} onChange={e => setType(e.target.value)}>
          <option value="private" id="type">Private</option>
          <option value="public" id="type">Public</option>
        </select>
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
      <label htmlFor="passwordConfirmation">
      Password Confirmation:
        <input
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          className={
            invalidPasswordConfirmation(password, passwordConfirmation)
            || invalidPassword(password) ? 'invalid' : 'valid'
          }
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
