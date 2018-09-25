import React, { Component } from 'react';

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
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
    const { type, password, passwordConfirmation } = this.state;
    /* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
    return (
      <div className="user-settings">
        <h3>Change Type</h3>
        <form>
          <label htmlFor="type">
        UserType:
            <select name="type" id="type" onChange={this.handleChange} value={type}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
          <button type="submit">Update</button>
        </form>
        <h3>Change Password</h3>
        <form>
          <label htmlFor="password">
          Password:
            <input name="password" id="password" onChange={this.handleChange} value={password} />
          </label>
          <label htmlFor="passwordConfirmation">
          PasswordConfirmation:
            <input name="passwordConfirmation" id="passwordConfirmation " onChange={this.handleChange} value={passwordConfirmation} />
          </label>

          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

export default UserSettings;
