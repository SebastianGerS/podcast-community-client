import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import User from '../../Models/User';

function UserInfo({
  user, currentUserId, updateUser, info,
}) {
  const [value, setValue] = useState(info.value);
  const [name] = useState(info.name);
  const [showInput, setShowInput] = useState();

  const toggleInput = () => {
    if (user._id === currentUserId) {
      setShowInput(!showInput);
    }
  };

  const updateValue = () => {
    if (value !== user[name]) {
      updateUser(currentUserId, { [name]: value });
    }
    toggleInput();
  };

  useEffect(() => {
    setValue(info.value);
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
                && <button className="edit" type="button" aria-label="edit" onClick={toggleInput} />
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
                  <input onChange={e => setValue(e.target.value)} value={value} onBlur={updateValue} autoFocus="true" />
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
                && <button className="edit" type="button" aria-label="edit" onClick={toggleInput} />
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
                <input value={value} onChange={e => setValue(e.target.value)} onBlur={updateValue} autoFocus="true" />
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
}

UserInfo.propTypes = {
  info: PropTypes.shape(
    {
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,

    },
  ).isRequired,
  updateUser: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired,
  user: PropTypes.shape(User).isRequired,
};

export default UserInfo;
