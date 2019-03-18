import React, { useEffect } from 'react';
import UserSettings from '../Containers/UserSettings';
import { scrollToTop } from '../Helpers/UserAgent';

function Settings(): JSX.Element {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="Settings">
      <h2>Settings</h2>
      <UserSettings />
    </div>
  );
}

export default Settings;
