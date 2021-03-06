import React, { useState, FormEvent } from 'react';
import {
  invalidPassword, invalidPasswordConfirmation,
} from '../../Helpers/Validation';
import { User } from '../../Models/User';

interface Props {
  user: User;
  updateUser: (userId: string, data: object) => void;
  deleteUser: (userId: string) => void;
}
function UserSettings({
  user, updateUser, deleteUser,
}: Props): JSX.Element {
  const [type, setType] = useState(user.type);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const attemptUpdateUser = (e: FormEvent): void => {
    e.preventDefault();
    if (typeof user._id === 'string') {
      if (type !== user.type) {
        updateUser(user._id, { type });
      } else {
        updateUser(user._id, { password, passwordConfirmation });
      }
    }
  };
  const userId = typeof user._id === 'string' ? user._id : '';

  /* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
  return (
    <div className="user-settings">
      <h3>Change Type</h3>
      <form onSubmit={attemptUpdateUser}>
        <label htmlFor="type">
      UserType:
          <select name="type" id="type" onChange={e => setType(e.target.value)} value={type}>
            <option value="public">Public</option>
            <option value="private">Private</option>
            { user.type === 'admin' && <option value="admin">Admin</option>}
          </select>
        </label>
        <button type="submit">Update</button>
      </form>
      <h3>Change Password</h3>
      <form onSubmit={attemptUpdateUser}>
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
              invalidPassword(password)
              || invalidPasswordConfirmation(password, passwordConfirmation) ? 'invalid' : 'valid'
            }
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
        </label>
        <button type="submit">Update</button>
      </form>
      <h3>Delete Account</h3>
      <button type="button" onClick={() => deleteUser(userId)} className="delete">Delete</button>
    </div>
  );
}

export default UserSettings;
