import React, { Component } from 'react';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      username, email, password, passwordConfirmation,
    } = this.state;
    return (
      <form className="register-form">
        <label htmlFor="username">
        Username:
          <input type="text" name="username" id="username" value={username} onChange={this.handleChange} />
        </label>

        <label htmlFor="email">
        Email:
          <input type="text" name="email" id="email" value={email} onChange={this.handleChange} />
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

export default RegisterForm;
