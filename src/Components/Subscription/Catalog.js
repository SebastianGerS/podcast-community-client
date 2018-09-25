import React from 'react';
import PropTypes from 'prop-types';
import List from '../../Helpers/List';
import ListablePodcast from '../../Containers/ListablePodcast';
import Podcast from '../../Models/Podcast';
import Loader from '../Layout/Loader';

const Catalog = ({ subscriptions }) => (typeof subscriptions[0].id === 'string' ? (
  <div className="catalog">
    <List component={ListablePodcast} data={subscriptions} />
  </div>
) : <Loader />);

Catalog.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.shape(Podcast)).isRequired,
};

export default Catalog;
