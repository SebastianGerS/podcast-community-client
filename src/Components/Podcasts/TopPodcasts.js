import React, { Component } from 'react';
import ListablePodcast from './ListablePodcast';
import List from '../../Helpers/List';

class TopPodcasts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { title: 'Sean Carroll\'s MindScape', lastest_pub_date_ms: 1536369452000, image: 'https://www.preposterousuniverse.com/wp-content/uploads/mindscape-med.png' },
        { title: 'Sean Carroll\'s MindScape', lastest_pub_date_ms: 1536369452000, image: 'https://www.preposterousuniverse.com/wp-content/uploads/mindscape-med.png' },
        { title: 'Sean Carroll\'s MindScape', lastest_pub_date_ms: 1536369452000, image: 'https://www.preposterousuniverse.com/wp-content/uploads/mindscape-med.png' },
        { title: 'Sean Carroll\'s MindScape', lastest_pub_date_ms: 1536369452000, image: 'https://www.preposterousuniverse.com/wp-content/uploads/mindscape-med.png' },
        { title: 'Sean Carroll\'s MindScape', lastest_pub_date_ms: 1536369452000, image: 'https://www.preposterousuniverse.com/wp-content/uploads/mindscape-med.png' },
        { title: 'Sean Carroll\'s MindScape', lastest_pub_date_ms: 1536369452000, image: 'https://www.preposterousuniverse.com/wp-content/uploads/mindscape-med.png' },
        { title: 'Sean Carroll\'s MindScape', lastest_pub_date_ms: 1536369452000, image: 'https://www.preposterousuniverse.com/wp-content/uploads/mindscape-med.png' },
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
