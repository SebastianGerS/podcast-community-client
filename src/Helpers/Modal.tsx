import React, { ComponentType } from 'react';
import { getMediumModalHeight, getSmalModalHeight } from './UserAgent';

interface Props {
  component: ComponentType;
  size: string;
  backgroundColor: string;
  height: number;
}

const Modal = ({
  component: Component, size, backgroundColor, height, ...props
}: Props): JSX.Element => {
  const styles = {
    height: size === 'smal' ? getSmalModalHeight(height) : getMediumModalHeight(height),
  };
  return (
    <div
      className={`modal top ${backgroundColor ? `background-${backgroundColor}` : 'background-black'}`}
      style={styles}
    >
      <Component {...props} />
    </div>
  );
};

export default Modal;
