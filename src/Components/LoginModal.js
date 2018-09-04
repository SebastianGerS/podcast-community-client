import React from 'react';
import LogginForm from './LoginForm';
import Modal from './Modal';

const LoginModal = () => (
  <Modal component={LogginForm} size="medium" backgroundColor="black" />
);
export default LoginModal;
