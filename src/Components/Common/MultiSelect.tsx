import React, {
  useState, MouseEvent, KeyboardEvent, FocusEvent,
} from 'react';
import { List } from 'immutable';
import uuid from 'uuid';
import { MultiSelectOption } from './MultiselectOption';
import { Option } from '../../Models/Option';

interface Props<T> {
  className: string;
  id: string;
  options: List<T>;
  selectedOptions: List<T>;
  toggleValue: (option: T) => void;
}

function MultiSelect<T extends Option>({
  className, options, selectedOptions, toggleValue, id,
}: Props<T>): JSX.Element {
  const [showDropdown, setShowDropdown] = useState(false);

  const multiSelectOptions = options.map((option) => {
    let selected = false;
    if (selectedOptions.contains(option)) {
      selected = true;
    }

    return (
      <MultiSelectOption
        option={option as T}
        className={selected ? 'selected' : ''}
        key={uuid.v4()}
        toggleValue={toggleValue}
      />
    );
  });

  const removeOption = (e: MouseEvent | KeyboardEvent, option: T): void => {
    e.stopPropagation();
    toggleValue(option);
  };

  const removeOptionOnKeyPress = (e: KeyboardEvent, option: T): void => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      toggleValue(option);
    }
  };

  const selected = selectedOptions.map(option => (
    <span className="selected" key={uuid.v4()}>
      {option.name}
      <i
        title="remove"
        role="button"
        className="remove"
        onClick={e => removeOption(e, option)}
        onKeyPress={e => removeOptionOnKeyPress(e, option)}
        tabIndex={0}
      />
    </span>
  ));

  const onBlur = (e: FocusEvent): void => {
    const { currentTarget } = e;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setShowDropdown(!showDropdown);
      }
    }, 0);
  };

  return (
    <div className="multi-select" id={id}>
      <div
        className={`multi-select-selections ${showDropdown ? 'dropdown-open' : 'dropdown-closed'} ${className}`}
        onClick={() => setShowDropdown(!showDropdown)}
        onKeyPress={() => setShowDropdown(!showDropdown)}
        role="listbox"
        tabIndex={0}
      >
        {selected.size > 0 ? selected : <span className="placeholder">Any genre</span>}
      </div>
      {showDropdown && (
        <div className="dropdown" role="listbox" onBlur={onBlur}>
          {multiSelectOptions}
        </div>
      )
      }
    </div>
  );
}


export default MultiSelect;
