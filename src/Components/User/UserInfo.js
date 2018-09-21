import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from '../../Models/User';

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      name: '',
      showInput: false,
    };
    this.toggleInput = this.toggleInput.bind(this);
    this.onChange = this.onChange.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  componentDidMount() {
    const { info } = this.props;
    this.setState({
      name: info.name,
      value: info.value,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.state;
    if (nextProps.info.value !== value) {
      this.setState({
        value: nextProps.info.value,
      });
    }
  }


  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  toggleInput() {
    const { user, currentUserId } = this.props;
    if (user._id === currentUserId) {
      const { showInput } = this.state;
      this.setState({
        showInput: !showInput,
      });
    }
  }

  updateValue() {
    const { name, value } = this.state;
    const { updateUser, currentUserId, user } = this.props;

    if (value !== user[name]) {
      updateUser(currentUserId, { [name]: value });
    }

    this.toggleInput();
  }

  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-autofocus,
  jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
  render() {
    const {
      value, name, showInput,
    } = this.state;
    const { user, currentUserId } = this.props;
    return (
      <div>
        { !showInput && name !== 'bio'
          && (
            <div className="info">
              <div onClick={this.toggleInput}>
                <span>
                  {`${name.charAt(0).toUpperCase()}${name.substr(1, name.length - 1)}:`}
                </span>
                <span>{value}</span>
              </div>
              { user._id === currentUserId
                && <button className="edit" type="button" aria-label="edit" onClick={this.toggleInput} />
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
                <form onSubmit={this.updateValue}>
                  <input onChange={this.onChange} value={value} onBlur={this.updateValue} autoFocus="true" />
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
                && <button className="edit" type="button" aria-label="edit" onClick={this.toggleInput} />
              }
            </div>
            <div className="info" onClick={this.toggleInput}>
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
              <form onSubmit={this.updateValue}>
                <input value={value} onChange={this.onChange} onBlur={this.updateValue} autoFocus="true" />
              </form>
            </div>
          </div>
        )

      }
      </div>
    );
  }
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
