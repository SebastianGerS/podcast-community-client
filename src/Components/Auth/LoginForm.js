import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  login(e) {
    e.preventDefault();
    const { atemptLogin, toggleModal } = this.props;
    const { email, password } = this.state;
    atemptLogin({ email, password });
    toggleModal('login');
  }

  render() {
    const { email, password } = this.state;
    return (
      <form className="login-form" onSubmit={this.login}>
        <label htmlFor="email">
        Email:
          <input type="text" name="email" id="email" value={email} onChange={this.handleChange} />
        </label>

        <label htmlFor="password">
        Password:
          <input type="text" name="password" id="password" value={password} onChange={this.handleChange} />
        </label>

        <button type="submit">Login</button>
      </form>
    );
  }
}
LoginForm.propTypes = {
  atemptLogin: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
export default LoginForm;