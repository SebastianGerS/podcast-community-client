import React from 'react';
import MenuBar from '../../Containers/Layout/MenuBar';
import MenuModal from './MenuModal';

interface Props {
  menuIsActive: boolean;
}

const MenuInterface = ({ menuIsActive }: Props): JSX.Element => (
  menuIsActive ? <MenuModal /> : <MenuBar />
);

export default MenuInterface;
