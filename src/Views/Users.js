import React, { useEffect } from 'react';
import UserTable from '../Containers/UserTable';
import { scrollToTop } from '../Helpers/UserAgent';

function Users() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="Users">
      <UserTable />
    </div>
  );
}

export default Users;
