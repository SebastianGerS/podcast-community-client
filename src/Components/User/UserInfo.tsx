import React, { useState, useEffect } from 'react';
import { User } from '../../Models/User';

interface Props {
  user: User;
  currentUserId: string;
  updateUser: (userId: string, data: object) => void;
  info: {
    name: 'username'| 'age' |'email' |'bio';
    value: string | number | undefined;
  };
  isUpdating: boolean;
  isFetching: boolean;
}

function UserInfo({
  user, currentUserId, updateUser, info, isUpdating, isFetching,
}: Props): JSX.Element {
  const [value, setValue] = useState(info.value);
  const [name] = useState(info.name);
  const [showInput, setShowInput] = useState();
  const [isUpdatingValue, setIsUpdatingValue] = useState(false);

  const toggleInput = (): void => {
    if (user._id === currentUserId) {
      setShowInput(!showInput);
    }
  };

  const updateValue = (): void => {
    if (value !== user[name]) {
      setIsUpdatingValue(true);
      updateUser(currentUserId, { [name]: value });
    }
    toggleInput();
  };

  useEffect(() => {
    if (!isUpdating && !isFetching) {
      setValue(info.value);
      setIsUpdatingValue(false);
    }
  }, [info]);

  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-autofocus,
  jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
  return (
    <div>
      { !showInput && name !== 'bio'
          && (
            <div className="info">
              <div onClick={toggleInput}>
                <span>
                  {`${name.charAt(0).toUpperCase()}${name.substr(1, name.length - 1)}:`}
                </span>
                <span>{value}</span>
              </div>
              { user._id === currentUserId
                && (
                  <button
                    className={isUpdatingValue ? 'editing' : 'edit'}
                    type="button"
                    aria-label="edit"
                    onClick={!isUpdatingValue ? toggleInput : undefined}
                  />
                )
              }

            </div>
          )

      }
      { showInput && name !== 'bio' && user._id === currentUserId
          && (
            <div className="info">
              <div>
                <span>
                  {`${name.charAt(0).toUpperCase()}${name.substr(1, name.length - 1)}:`}
                </span>
                <form onSubmit={updateValue}>
                  <input onChange={e => setValue(e.target.value)} value={value} onBlur={updateValue} autoFocus />
                </form>
              </div>
            </div>
          )

      }
      { !showInput && name === 'bio'
        && (
          <div>
            <div className="info">
              <p>{`${name.charAt(0).toUpperCase()}${name.substr(1, name.length - 1)}:`}</p>
              { user._id === currentUserId
                && (
                  <button
                    className={isUpdatingValue ? 'editing' : 'edit'}
                    type="button"
                    aria-label="edit"
                    onClick={!isUpdatingValue ? toggleInput : undefined}
                  />
                )
              }
            </div>
            <div className="info" onClick={toggleInput}>
              <p>{value}</p>
            </div>
          </div>
        )

      }
      { showInput && name === 'bio' && user._id === currentUserId
        && (
          <div>
            <div className="info">
              <p>{`${name.charAt(0).toUpperCase()}${name.substr(1, name.length - 1)}:`}</p>
            </div>
            <div className="info">
              <form onSubmit={updateValue}>
                <input value={value} onChange={e => setValue(e.target.value)} onBlur={updateValue} autoFocus />
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default UserInfo;
