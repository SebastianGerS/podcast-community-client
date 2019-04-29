import React, { ComponentType } from 'react';
import { getMediumModalHeight, getSmalModalHeight } from '../../Helpers/UserAgent';

interface Props {
  component: ComponentType | null;
  size: string;
  backgroundColor: string;
  height: number;
  flippedProps?: any;
}

const Modal = ({
  component: Component, size, backgroundColor, height, flippedProps, ...props
}: Props): JSX.Element => {
  const styles = {
    height: size === 'smal' ? getSmalModalHeight(height) : getMediumModalHeight(height),
  };
  return (
    <div
      className={`modal top ${backgroundColor ? `background-${backgroundColor}` : 'background-black'}`}
      style={styles}
      {...flippedProps}
    >
      { Component ? <Component {...props} /> : null}
    </div>
  );
};

export default Modal;
