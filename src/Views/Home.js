import React, { Component } from 'react';
import TopPodcasts from '../Components/Podcasts/TopPodcasts';
import { scrollToTop } from '../Helpers/UserAgent';

class Home extends Component {
  componentDidMount() {
    scrollToTop();
  }

  render() {
    return (
      <div className="Home">
        <h2>Top Podcasts</h2>
        <TopPodcasts />
      </div>
    );
  }
}

export default Home;
