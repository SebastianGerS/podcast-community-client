import React, { Component } from 'react';
import UserSettings from '../Components/Settings/UserSettings';
import { scrollToTop } from '../Helpers/UserAgent';

class Settings extends Component {
  componentDidMount() {
    scrollToTop();
  }

  render() {
    return (
      <div className="Settings">
        <h2>Settings</h2>
        <UserSettings />
      </div>
    );
  }
}


export default Settings;
