import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scrollToTop } from '../../Helpers/UserAgent';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.validateUserData = this.validateUserData.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  login(e) {
    e.preventDefault();
    const { atemptLogin } = this.props;
    const { email, password } = this.state;
    scrollToTop();
    if (this.validateUserData) {
      atemptLogin({ email, password });
    }
  }

  validateUserData() {
    const { password, email } = this.state;
    const { atemptSetMessage } = this.props;
    if (!email.includes('@')) {
      atemptSetMessage({ message: 'please enter a valid email address', type: 'warning' });
      return false;
    }
    if (password.length < 8) {
      atemptSetMessage({ message: 'passwords must be atleast 8 characters long', type: 'warning' });
      return false;
    }

    return true;
  }

  render() {
    const { email, password } = this.state;
    return (
      <form className="login-form" onSubmit={this.login}>
        <label htmlFor="email">
        Email:
          <input type="text" name="email" id="email" className={!email.includes('@') ? 'invalid' : 'valid'} value={email} onChange={this.handleChange} />
        </label>

        <label htmlFor="password">
        Password:
          <input type="password" name="password" id="password" className={password.length < 8 ? 'invalid' : 'valid'} value={password} onChange={this.handleChange} />
        </label>

        <button type="submit">Login</button>
      </form>
    );
  }
}
LoginForm.propTypes = {
  atemptLogin: PropTypes.func.isRequired,
  atemptSetMessage: PropTypes.func.isRequired,
};
export default LoginForm;
