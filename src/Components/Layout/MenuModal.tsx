import React from 'react';
import Menu from '../../Containers/Layout/Menu';
import Modal from '../../Containers/Common/Modal';

const MenuModal = ({ ...props }): JSX.Element => (
  <Modal component={Menu} size="medium" backgroundColor="black" {...props} />
);

export default MenuModal;
