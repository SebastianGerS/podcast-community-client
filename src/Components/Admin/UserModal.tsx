import React from 'react';
import UserForm from '../../Containers/Admin/UserForm';
import Modal from '../../Containers/Common/Modal';

const UserModal = (): JSX.Element => (
  <Modal component={UserForm} size="smal" backgroundColor="black" />
);

export default UserModal;
