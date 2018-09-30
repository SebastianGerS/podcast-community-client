import React, { Component } from 'react';
import UserTable from '../Containers/UserTable';
import { scrollToTop } from '../Helpers/UserAgent';

class Users extends Component {
  componentDidMount() {
    scrollToTop();
  }

  render() {
    return (
      <div className="Users">
        <UserTable />
      </div>
    );
  }
}


export default Users;
