import React, { useEffect } from 'react';
import UserRow from '../../Containers/UserRow';
import TableBody from '../../Helpers/TableBody';
import { User } from '../../Models/User';
import UserModal from './UserModal';
import Pagination from '../Layout/Pagination';

interface UserSearch {
  offset?: number;
  type?: string;
  term?: string;
}

interface Props {
  users: User[];
  isFetching: boolean;
  toggleUserModal: () => void;
  modalIsActive: boolean;
  getUsers: (data: UserSearch) => Promise<void>;
  offset: number;
  morePages: boolean;
}

function UserTable({
  users, isFetching, toggleUserModal, modalIsActive, getUsers, offset, morePages,
}: Props): JSX.Element {
  useEffect(() => {
    getUsers({ term: '', type: 'user', offset });
  }, []);

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
      <Pagination
        term=""
        type="user"
        offset={offset}
        search={getUsers}
        morePages={morePages}
        isSearching={isFetching}
      />
    </div>
  );
}

export default UserTable;
