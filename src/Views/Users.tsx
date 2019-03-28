import React, { useEffect } from 'react';
import UserTable from '../Containers/Admin/UserTable';
import { scrollToTop } from '../Helpers/UserAgent';

function Users(): JSX.Element {
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
