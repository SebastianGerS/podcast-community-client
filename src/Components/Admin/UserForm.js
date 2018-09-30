import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JWT from 'jsonwebtoken';
import config from '../../Config/config';
import User from '../../Models/User';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      type: 'private',
      password: '',
      passwordConfirmation: '',
      passwordEdited: false,
    };
    this.handleUser = this.handleUser.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateUserData = this.validateUserData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { user } = this.props;

    if (typeof user._id === 'string') {
      this.setState({
        username: user.username,
        email: user.email,
        type: user.type,
      });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;

    if (name === 'password') {
      this.setState({
        passwordEdited: true,
      });
    }
    this.setState({
      [name]: value,
    });
  }

  validateUserData() {
    if (this.validateEmail() && this.validateUsername() && this.validatePassword()) {
      return true;
    }
    return false;
  }

  validateEmail() {
    const { email } = this.state;
    const { setMessage } = this.props;
    if (!email.includes('@')) {
      setMessage({ message: 'please enter a valid email address', type: 'warning' });
      return false;
    }
    return true;
  }

  validateUsername() {
    const { username } = this.state;
    const { setMessage } = this.props;
    if (username === '') {
      setMessage({ message: 'please select a username', type: 'warning' });
      return false;
    }
    return true;
  }

  validatePassword() {
    const {
      password, passwordConfirmation,
    } = this.state;
    const { setMessage } = this.props;

    if (password !== passwordConfirmation) {
      setMessage({ message: 'Passwordconfirmation does not match', type: 'warning' });
      return false;
    }
    if (password.length < 8) {
      setMessage({ message: 'passwords must be atleast 8 characters long', type: 'warning' });
      return false;
    }

    return true;
  }

  handleUser(e) {
    e.preventDefault();
    const { update, create, user } = this.props;
    const {
      username, email, password, type, passwordEdited,
    } = this.state;

    if (typeof user._id === 'string') {
      const fieldsToUpdate = {};
      if (username !== user.username) {
        if (this.validateUsername()) {
          fieldsToUpdate.username = username;
        }
      }
      if (email !== user.email) {
        if (this.validateEmail()) {
          fieldsToUpdate.email = email;
        }
      }
      if (password.length !== 0) {
        if (this.validatePassword()) {
          fieldsToUpdate.password = JWT.sign(password, config.JWT_SECRET);
        }
      }
      if (type !== user.type) {
        fieldsToUpdate.type = type;
      }
      if (passwordEdited && this.validatePassword()) {
        update(user._id, fieldsToUpdate);
      } else if (!passwordEdited) {
        update(user._id, fieldsToUpdate);
      }
    } else if (typeof user._id !== 'string') {
      if (this.validateUserData()) {
        const newUser = {
          username,
          email,
          password,
          type,
        };
        create(newUser);
      }
    }
  }

  /* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
  render() {
    const {
      username, email, type, password, passwordConfirmation,
    } = this.state;
    const {
      user, toggleUserModal, unsetUser, deleteUser,
    } = this.props;
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
        <form onSubmit={this.handleUser}>
          <label htmlFor="username">
        Username:
            <input type="text" className={username === '' ? 'invalid' : 'valid'} name="username" id="username" value={username} onChange={this.handleChange} />
          </label>
          <label htmlFor="email">
        Email:
            <input type="text" name="email" id="email" className={!email.includes('@') ? 'invalid' : 'valid'} value={email} onChange={this.handleChange} />
          </label>
          <label htmlFor="password">
        Password:
            <input type="password" name="password" id="password" className={password.length < 8 ? 'invalid' : 'valid'} value={password} onChange={this.handleChange} />
          </label>
          <label htmlFor="passwordConfirmation">
        Confirma Password:
            <input type="password" name="passwordConfirmation" id="passwordConfirmation" className={passwordConfirmation.length < 8 || passwordConfirmation !== password ? 'invalid' : 'valid'} value={passwordConfirmation} onChange={this.handleChange} />
          </label>
          <label htmlFor="type">
        Type:
            <select name="type" id="type" value={type} onChange={this.handleChange}>
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
