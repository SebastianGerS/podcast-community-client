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
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }


  register(e) {
    e.preventDefault();
    const { atemptRegister } = this.props;
    const {
      username, email, password, passwordConfirmation, type,
    } = this.state;
    if (password === passwordConfirmation) {
      const user = {
        username,
        email,
        password,
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
          <input type="text" name="username" id="username" value={username} onChange={this.handleChange} />
        </label>

        <label htmlFor="email">
        Email:
          <input type="text" name="email" id="email" value={email} onChange={this.handleChange} />
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
          <input type="text" name="password" id="password" value={password} onChange={this.handleChange} />
        </label>

        <label htmlFor="passwordConfirmation">
        Password Confirmation:
          <input type="text" name="passwordConfirmation" id="passwordConfirmation" value={passwordConfirmation} onChange={this.handleChange} />
        </label>

        <button type="submit">Register</button>
      </form>
    );
  }
}
RegisterForm.propTypes = {
  atemptRegister: PropTypes.func.isRequired,
  redirect: PropTypes.instanceOf(Immutable.Record).isRequired,
};
export default RegisterForm;
