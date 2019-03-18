import React, { useEffect } from 'react';
import RegisterForm from '../Containers/RegisterForm';
import { scrollToTop } from '../Helpers/UserAgent';

function Register(): JSX.Element {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="Register">
      <RegisterForm />
    </div>
  );
}

export default Register;
