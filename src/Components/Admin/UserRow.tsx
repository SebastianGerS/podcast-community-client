import React from 'react';
import { User } from '../../Models/User';

interface Props {
  data: User;
  selectUser: (user: User) => void;
}
const UserRow = ({ data, selectUser }: Props): JSX.Element => (
  <tr>
    <td className="spacer" />
    <td>
      <button
        type="button"
        onClick={() => selectUser(data)}
        className="select-user"
      >
        { typeof data.username === 'string' ? data.username : '' }
      </button>
    </td>
    <td>{typeof data.type === 'string' ? data.type : ''}</td>
    <td className="spacer" />
  </tr>
);

export default UserRow;
