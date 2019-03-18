import React, { useState, FormEvent } from 'react';
import JWT from 'jsonwebtoken';
import config from '../../Config/config';
import {
  invalidEmail, invalidPassword, invalidUsername, invalidPasswordConfirmation,
} from '../../Helpers/Validation';
import { User } from '../../Models/User';

interface Props {
  user: User;
  toggleUserModal: () => void;
  unsetUser: () => void;
  deleteUser: (id: string | StringConstructor) => void;
  create: (data: object) => void;
  update: (id: string, data: object) => void;
  validUserData: (data: object) => boolean;
  validUsername: (username: string) => boolean;
  validEmail: (email: string) => boolean;
  validPassword: (password: string) => boolean;
  validPasswordConfirmation: (password: string, passwordConfirmation: string) => boolean;
}
interface UserData {
  username?: string;
  email?: string;
  type?: string;
  password?: string;
}

function UserForm({
  validUsername, validEmail, validPassword, validPasswordConfirmation,
  validUserData, update, create, user, toggleUserModal, unsetUser, deleteUser,
}: Props): JSX.Element {
  const existingUser = typeof user._id === 'string';
  const [username, setUsername] = useState(existingUser ? user.username : '');
  const [email, setEmail] = useState(existingUser ? user.email : '');
  const [type, setType] = useState(existingUser ? user.type : 'private');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleUser = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (typeof user._id === 'string') {
      const fieldsToUpdate: UserData = {};
      if (username !== user.username) {
        if (validUsername(username)) {
          fieldsToUpdate.username = username;
        }
      }
      if (email !== user.email) {
        if (validEmail(email)) {
          fieldsToUpdate.email = email;
        }
      }
      if (password.length !== 0) {
        if (validPassword(password) && validPasswordConfirmation(password, passwordConfirmation)) {
          fieldsToUpdate.password = JWT.sign(password, config.JWT_SECRET);
        }
      }
      if (type !== user.type) {
        fieldsToUpdate.type = type;
      }

      if (Object.entries(fieldsToUpdate).length > 0) {
        update(user._id, fieldsToUpdate);
      }
    } else if (typeof user._id !== 'string') {
      const newUser = {
        username,
        email,
        password,
        type,
      };

      if (validUserData({ ...newUser, passwordConfirmation })) {
        create(newUser);
      }
    }
  };
  /* eslint-disable jsx-a11y/label-has-associated-control,
  jsx-a11y/label-has-for, no-nested-ternary */
  return (
    <div className="user-form">
      <button
        type="button"
        className="close"
        onClick={() => {
          toggleUserModal();
          unsetUser();
        }}
      />
      <form onSubmit={handleUser}>
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
        <label htmlFor="password">
        Password:
          <input
            type="password"
            name="password"
            id="password"
            className={
              password === ''
                ? ''
                : invalidPassword(password)
                  ? 'invalid'
                  : 'valid'
            }
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="passwordConfirmation">
        Confirma Password:
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            className={
              password === ''
                ? ''
                : invalidPassword(password)
                || invalidPasswordConfirmation(password, passwordConfirmation)
                  ? 'invalid'
                  : 'valid'
            }
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
        </label>
        <label htmlFor="type">
        Type:
          <select name="type" id="type" value={type} onChange={e => setType(e.target.value)}>
            <option value="private" id="type">Private</option>
            <option value="public" id="type">Public</option>
            <option value="admin" id="type">Admin</option>
            <option value="blocked" id="type">Blocked</option>
          </select>
        </label>
        <div className="buttons">
          {typeof user._id === 'string'
           && <button type="button" onClick={() => deleteUser(user._id)}>Delete</button>
          }
          <button type="submit">{typeof user._id === 'string' ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
