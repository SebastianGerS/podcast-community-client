import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JWT from 'jsonwebtoken';
import config from '../../Config/config';
import User from '../../Models/User';

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      password: '',
      passwordConfirmation: '',

    };
    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentWillMount() {
    const { user } = this.props;

    this.setState({
      type: user.type,
    });
  }

  shouldComponentUpdate(nextProps) {
    const { user } = this.props;

    if (nextProps.user !== user) {
      this.setState({
        type: nextProps.user.type,
      });
      return true;
    }
    return true;
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  validateUserData() {
    const {
      password, passwordConfirmation,
    } = this.state;
    const { atemptSetMessage } = this.props;

    if (password !== passwordConfirmation) {
      atemptSetMessage({ message: 'Passwordconfirmation does not match', type: 'warning' });
      return false;
    }
    if (password.length < 8) {
      atemptSetMessage({ message: 'passwords must be atleast 8 characters long', type: 'warning' });
      return false;
    }

    return true;
  }

  updateUser(e) {
    e.preventDefault();
    const { updateUser, user } = this.props;
    const { password, type } = this.state;

    if (type !== user.type) {
      updateUser(user._id, { type });
    } else if (this.validateUserData()) {
      const tempToken = JWT.sign(password, config.JWT_SECRET);
      updateUser(user._id, { password: tempToken });
    }
  }

  render() {
    const { type, password, passwordConfirmation } = this.state;
    const { user, deleteUser } = this.props;
    /* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
    return (
      <div className="user-settings">
        <h3>Change Type</h3>
        <form onSubmit={this.updateUser}>
          <label htmlFor="type">
        UserType:
            <select name="type" id="type" onChange={this.handleChange} value={type}>
              <option value="public">Public</option>
              <option value="private">Private</option>
              { user.type === 'admin' && <option value="admin">Admin</option>}
            </select>
          </label>
          <button type="submit">Update</button>
        </form>
        <h3>Change Password</h3>
        <form onSubmit={this.updateUser}>
          <label htmlFor="password">
        Password:
            <input type="password" name="password" id="password" className={password.length < 8 ? 'invalid' : 'valid'} value={password} onChange={this.handleChange} />
          </label>
          <label htmlFor="passwordConfirmation">
        Password Confirmation:
            <input type="password" name="passwordConfirmation" id="passwordConfirmation" className={passwordConfirmation.length < 8 || passwordConfirmation !== password ? 'invalid' : 'valid'} value={passwordConfirmation} onChange={this.handleChange} />
          </label>
          <button type="submit">Update</button>
        </form>
        <h3>Delete Account</h3>
        <button type="button" onClick={() => deleteUser(user._id)} className="delete">Delete</button>
      </div>
    );
  }
}

UserSettings.propTypes = {
  user: PropTypes.shape(User).isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  atemptSetMessage: PropTypes.func.isRequired,
};

export default UserSettings;
