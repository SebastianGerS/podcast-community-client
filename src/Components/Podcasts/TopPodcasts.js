import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ListablePodcast from './ListablePodcast';
import List from '../../Helpers/List';
import Podcast from '../../Models/Podcast';

function TopPodcasts({ getTopPodcasts, topPodcasts }) {
  useEffect(() => {
    getTopPodcasts();
  }, []);

  return typeof topPodcasts[0].id === 'string' ? (
    <div>
      <List data={topPodcasts} component={ListablePodcast} />
    </div>
  ) : null;
}

TopPodcasts.propTypes = {
  topPodcasts: PropTypes.arrayOf(PropTypes.shape(Podcast)).isRequired,
  getTopPodcasts: PropTypes.func.isRequired,
};

export default TopPodcasts;
