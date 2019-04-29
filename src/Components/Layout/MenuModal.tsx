import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import Menu from '../../Containers/Layout/Menu';
import Modal from '../../Containers/Common/Modal';

const MenuModal = ({ ...props }): JSX.Element => (
  <Flipped flipId="menu">
    {flippedProps => (
      <Modal component={Menu} size="medium" backgroundColor="black" {...props} flippedProps={flippedProps} />
    )
    }
  </Flipped>
);

export default MenuModal;
