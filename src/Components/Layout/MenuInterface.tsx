import React from 'react';
import { Flipper } from 'react-flip-toolkit';
import MenuBar from '../../Containers/Layout/MenuBar';
import MenuModal from './MenuModal';

interface Props {
  menuIsActive: boolean;
}

const MenuInterface = ({ menuIsActive }: Props): JSX.Element => (
  <Flipper flipKey={menuIsActive} className={menuIsActive ? 'menu' : 'menu bottom-1 bar'}>
    { menuIsActive
      ? <MenuModal />
      : <MenuBar />
    }
  </Flipper>
);

export default MenuInterface;
