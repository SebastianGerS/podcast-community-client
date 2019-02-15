import React, { useState } from 'react';
import PropTypes from 'prop-types';
import JWT from 'jsonwebtoken';
import config from '../../Config/config';
import User from '../../Models/User';
import {
  invalidEmail, invalidPassword, invalidUsername, invalidPasswordConfirmation,
} from '../../Helpers/Validation';

function UserForm({
  setMessage, update, create, user, toggleUserModal, unsetUser, deleteUser,
}) {
  const existingUser = typeof user._id === 'string';
  const [username, setUsername] = useState(existingUser ? user.username : '');
  const [email, setEmail] = useState(existingUser ? user.email : '');
  const [type, setType] = useState(existingUser ? user.type : 'private');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const validEmail = () => {
    if (invalidEmail(email)) {
      setMessage({ message: 'please enter a valid email address', type: 'warning' });
      return false;
    }
    return true;
  };

  const validUsername = () => {
    if (invalidUsername(username)) {
      setMessage({ message: 'please select a username', type: 'warning' });
      return false;
    }
    return true;
  };

  const validPassword = () => {
    if (invalidPasswordConfirmation(password, passwordConfirmation)) {
      setMessage({ message: 'Passwordconfirmation does not match', type: 'warning' });
      return false;
    }
    if (invalidPassword(password)) {
      setMessage({ message: 'passwords must be atleast 8 characters long', type: 'warning' });
      return false;
    }
    return true;
  };

  const validUserData = () => {
    if (validEmail() && validUsername() && validPassword()) {
      return true;
    }
    return false;
  };

  const handleUser = (e) => {
    e.preventDefault();
    let passwordEdited = false;
    if (typeof user._id === 'string') {
      const fieldsToUpdate = {};
      if (username !== user.username) {
        if (validUsername()) {
          fieldsToUpdate.username = username;
        }
      }
      if (email !== user.email) {
        if (validEmail()) {
          fieldsToUpdate.email = email;
        }
      }
      if (password.length !== 0) {
        passwordEdited = true;
        if (validPassword()) {
          fieldsToUpdate.password = JWT.sign(password, config.JWT_SECRET);
        }
      }
      if (type !== user.type) {
        fieldsToUpdate.type = type;
      }
      if (passwordEdited && validPassword()) {
        update(user._id, fieldsToUpdate);
      } else if (!passwordEdited) {
        update(user._id, fieldsToUpdate);
      }
    } else if (typeof user._id !== 'string') {
      if (validUserData()) {
        const newUser = {
          username,
          email,
          password,
          type,
        };
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
          <input type="text" className={invalidUsername(username) ? 'invalid' : 'valid'} name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label htmlFor="email">
        Email:
          <input type="text" name="email" id="email" className={invalidEmail(email) ? 'invalid' : 'valid'} value={email} onChange={e => setEmail(e.target.value)} />
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
            onChange={e => setPasswordConfirmation(e.target.value)
          }
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

UserForm.propTypes = {
  user: PropTypes.shape(User),
  toggleUserModal: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  unsetUser: PropTypes.func.isRequired,

};

UserForm.defaultProps = {
  user: new User(),
};

export default UserForm;
