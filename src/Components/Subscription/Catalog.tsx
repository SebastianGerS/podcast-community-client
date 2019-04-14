import React from 'react';
import List from '../Common/List';
import ListablePodcast from '../../Containers/Search/ListablePodcast';
import { Podcast } from '../../Models/Podcast';

interface Props {
  subscriptions: Podcast[];
}
const Catalog = ({ subscriptions }: Props): JSX.Element => (
  <div className="catalog">
    <List component={ListablePodcast} data={subscriptions} />
  </div>
);

export default Catalog;
