import React from 'react';
import LogginForm from '../../Containers/LoginForm';
import Modal from '../../Containers/Modal';

const LoginModal = ({ ...props }) => (
  <Modal component={LogginForm} size="smal" backgroundColor="black" {...props} />
);
export default LoginModal;
