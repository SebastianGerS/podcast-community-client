import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      type: 'private',
      password: '',
      passwordConfirmation: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.validateUserData = this.validateUserData.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  validateUserData() {
    const {
      password, passwordConfirmation, username, email,
    } = this.state;
    const { atemptSetMessage } = this.props;

    if (username === '') {
      atemptSetMessage({ message: 'please select a username', type: 'warning' });
      return false;
    }
    if (!email.includes('@')) {
      atemptSetMessage({ message: 'please enter a valid email address', type: 'warning' });
      return false;
    }
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

  register(e) {
    e.preventDefault();
    const { atemptRegister } = this.props;
    const {
      username, email, password, passwordConfirmation, type,
    } = this.state;
    if (this.validateUserData()) {
      const user = {
        username,
        email,
        password,
        passwordConfirmation,
        type,
      };
      atemptRegister(user);
    }
  }

  renderRedirect() {
    const { redirect } = this.props;
    return typeof redirect.to === 'string' ? <Redirect to={redirect.to} /> : null;
  }

  /* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */

  render() {
    const {
      username, email, password, passwordConfirmation, type,
    } = this.state;

    return (
      <form className="register-form" onSubmit={this.register}>
        {this.renderRedirect()}
        <label htmlFor="username">
        Username:
          <input type="text" className={username === '' ? 'invalid' : 'valid'} name="username" id="username" value={username} onChange={this.handleChange} />
        </label>
        <label htmlFor="email">
        Email:
          <input type="text" name="email" id="email" className={!email.includes('@') ? 'invalid' : 'valid'} value={email} onChange={this.handleChange} />
        </label>
        <label htmlFor="type">
        Account Type:
          <select name="type" id="type" value={type} onChange={this.handleChange}>
            <option value="private" id="type">Private</option>
            <option value="public" id="type">Public</option>
          </select>
        </label>
        <label htmlFor="password">
        Password:
          <input type="password" name="password" id="password" className={password.length < 8 ? 'invalid' : 'valid'} value={password} onChange={this.handleChange} />
        </label>
        <label htmlFor="passwordConfirmation">
        Password Confirmation:
          <input type="password" name="passwordConfirmation" id="passwordConfirmation" className={passwordConfirmation.length < 8 || passwordConfirmation !== password ? 'invalid' : 'valid'} value={passwordConfirmation} onChange={this.handleChange} />
        </label>
        <button type="submit">Register</button>
      </form>
    );
  }
}
RegisterForm.propTypes = {
  atemptRegister: PropTypes.func.isRequired,
  atemptSetMessage: PropTypes.func.isRequired,
  redirect: PropTypes.instanceOf(Immutable.Record).isRequired,
};
export default RegisterForm;
