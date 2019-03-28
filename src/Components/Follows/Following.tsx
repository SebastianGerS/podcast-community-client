import React from 'react';
import List from '../Common/List';
import ListableUser from '../Search/ListableUser';
import { User } from '../../Models/User';

interface Props {
  following: User[];
}
function Following({ following }: Props): JSX.Element {
  return (
    <div className="following">
      <h3>Following:</h3>
      {following.length !== 0
        ? <List component={ListableUser} data={following} />
        : <p>you are not following anyone yeat</p>}
    </div>
  );
}

export default Following;
