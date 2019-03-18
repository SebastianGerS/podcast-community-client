import React from 'react';
import LogginForm from '../../Containers/Auth/LoginForm';
import Modal from '../../Containers/Common/Modal';

const LoginModal = ({ ...props }): JSX.Element => (
  <Modal component={LogginForm} size="smal" backgroundColor="black" {...props} />
);
export default LoginModal;
