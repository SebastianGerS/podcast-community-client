import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
    const { username, password } = this.state;
    return (
      <form className="login-form">
        <label htmlFor="username">
        Username:
          <input type="text" name="username" id="username" value={username} onChange={this.handleChange} />
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

export default LoginForm;
