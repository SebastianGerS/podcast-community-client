import React, { Component } from 'react';
import ListablePodcast from './ListablePodcast';
import List from './List';

class TopPodcasts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { podcast: 'Sean Carroll\'s MindScape', lastestEpisodeDate: '16/8/18', logo: 'https://www.preposterousuniverse.com/wp-content/uploads/mindscape-med.png' },
        { podcast: 'Sean Carroll\'s MindScape', lastestEpisodeDate: '16/8/18', logo: 'https://www.preposterousuniverse.com/wp-content/uploads/mindscape-med.png' },
        { podcast: 'Sean Carroll\'s MindScape', lastestEpisodeDate: '16/8/18', logo: 'https://www.preposterousuniverse.com/wp-content/uploads/mindscape-med.png' },
        { podcast: 'Sean Carroll\'s MindScape', lastestEpisodeDate: '16/8/18', logo: 'https://www.preposterousuniverse.com/wp-content/uploads/mindscape-med.png' },
        { podcast: 'Sean Carroll\'s MindScape', lastestEpisodeDate: '16/8/18', logo: 'https://www.preposterousuniverse.com/wp-content/uploads/mindscape-med.png' },
        { podcast: 'Sean Carroll\'s MindScape', lastestEpisodeDate: '16/8/18', logo: 'https://www.preposterousuniverse.com/wp-content/uploads/mindscape-med.png' },
        { podcast: 'Sean Carroll\'s MindScape', lastestEpisodeDate: '16/8/18', logo: 'https://www.preposterousuniverse.com/wp-content/uploads/mindscape-med.png' },
      ],

    };
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <List data={data} component={ListablePodcast} />
      </div>
    );
  }
}

export default TopPodcasts;
