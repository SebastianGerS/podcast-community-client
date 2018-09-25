import React, { Component } from 'react';
import UserSubscriptions from '../Containers/MySubscriptions';
import { scrollToTop } from '../Helpers/UserAgent';

class MySubscriptions extends Component {
  componentDidMount() {
    scrollToTop();
  }

  render() {
    return (
      <div className="MySubscriptions">
        <UserSubscriptions />
      </div>
    );
  }
}

export default MySubscriptions;
