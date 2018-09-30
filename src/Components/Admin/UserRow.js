import React from 'react';
import PropTypes from 'prop-types';
import User from '../../Models/User';

const UserRow = ({ data, selectUser }) => (
  <tr>
    <td className="spacer" />
    <td><button type="button" onClick={() => selectUser(data)} className="select-user">{typeof data.username === 'string' ? data.username : ''}</button></td>
    <td>{typeof data.type === 'string' ? data.type : ''}</td>
    <td className="spacer" />
  </tr>
);

UserRow.propTypes = {
  data: PropTypes.shape(User).isRequired,
  selectUser: PropTypes.func.isRequired,
};

export default UserRow;
