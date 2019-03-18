import React from 'react';
import List from '../../Helpers/List';
import ListablePodcast from '../../Containers/ListablePodcast';
import Loader from '../Layout/Loader';
import { Podcast } from '../../Models/Podcast';

interface Props {
  subscriptions: Podcast[];
}
const Catalog = ({ subscriptions }: Props): JSX.Element => (typeof subscriptions[0].id === 'string' ? (
  <div className="catalog">
    <List component={ListablePodcast} data={subscriptions} />
  </div>
) : <Loader />);

export default Catalog;
