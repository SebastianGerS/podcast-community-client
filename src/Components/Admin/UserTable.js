import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserRow from '../../Containers/UserRow';
import TableBody from '../../Helpers/TableBody';
import User from '../../Models/User';
import UserModal from './UserModal';

class UserTable extends Component {
  componentWillMount() {
    const { getUsers } = this.props;

    getUsers();
  }

  render() {
    const {
      users, isFetching, toggleUserModal, modalIsActive,
    } = this.props;
    return (
      <div className="handle-users">
        <button type="button" onClick={toggleUserModal} className="create-user-button">Create User</button>
        <h3>Users</h3>
        { modalIsActive
          && <UserModal />
        }
        {!isFetching && (
        <table className="user-table">
          <thead>
            <tr>
              <th className="spacer" />
              <th>Username</th>
              <th>Type</th>
              <th className="spacer" />
            </tr>
          </thead>
          <TableBody data={users} component={UserRow} />
        </table>
        )}
      </div>
    );
  }
}
UserTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(User)).isRequired,
  isFetching: PropTypes.bool.isRequired,
  modalIsActive: PropTypes.bool.isRequired,
  getUsers: PropTypes.func.isRequired,
  toggleUserModal: PropTypes.func.isRequired,
};
export default UserTable;
