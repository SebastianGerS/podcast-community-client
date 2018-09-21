import React, { Component } from 'react';
import RegisterForm from '../Containers/RegisterForm';
import { scrollToTop } from '../Helpers/UserAgent';

class Register extends Component {
  componentDidMount() {
    scrollToTop();
  }

  render() {
    return (
      <div className="Register">
        <RegisterForm />
      </div>
    );
  }
}

export default Register;
