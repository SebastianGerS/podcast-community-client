import React from 'react';
import Menu from '../../Containers/Menu';
import Modal from '../../Helpers/Modal';

const MenuModal = ({ ...props }) => (
  <Modal component={Menu} size="medium" backgroundColor="black" {...props} />
);

export default MenuModal;
