import React, { HTMLAttributes, KeyboardEvent } from 'react';
import { Option } from '../../Models/Option';

interface Props<T> {
  option: T;
  className: string;
  toggleValue: (option: T) => void;
}


export interface MultiSelectOption<T> extends HTMLAttributes<HTMLDivElement> {
  option?: T;
}

export function MultiSelectOption<T extends Option>({
  className, toggleValue, option,
}: Props<T>): JSX.Element {
  const onClick = (): void => {
    toggleValue(option);
  };

  const onKeyPress = (e: KeyboardEvent): void => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      toggleValue(option);
    }
  };

  return (
    <div
      role="option"
      className={`option ${className}`}
      onClick={onClick}
      onKeyPress={onKeyPress}
      tabIndex={0}
      aria-selected
    >
      {option.name}
    </div>
  );
}
