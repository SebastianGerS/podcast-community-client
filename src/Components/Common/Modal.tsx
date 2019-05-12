import React, { ComponentType, useEffect } from 'react';
import { getMediumModalHeight, getSmalModalHeight } from '../../Helpers/UserAgent';

interface Props {
  component: ComponentType | null;
  size: string;
  backgroundColor: string;
  height: number;
  hasResized: boolean;
  flippedProps?: any;
  heightUpdated: () => void;
}

const Modal = ({
  component: Component, size, backgroundColor, height, flippedProps, hasResized, heightUpdated, ...props
}: Props): JSX.Element => {
  const styles = {
    height: size === 'smal' ? getSmalModalHeight(height) : getMediumModalHeight(height),
  };

  useEffect(() => {
    if (hasResized) {
      heightUpdated();
    }
  }, [hasResized]);

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
