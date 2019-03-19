import React, { useEffect, useMemo, ComponentType } from 'react';
import List from '../Common/List';
import ListablePodcast from './ListablePodcast';
import ListableEpisode from '../../Containers/Search/ListableEpisode';
import ListableUser from './ListableUser';
import Loader from '../Layout/Loader';
import { scrollToTop } from '../../Helpers/UserAgent';
import { User } from '../../Models/User';
import { Podcast } from '../../Models/Podcast';
import { Episode } from '../../Models/Episode';

interface Props {
  type: string;
  results: (User | Podcast | Episode)[];
  isSearching: boolean;
}
function SearchResults({
  type, results, isSearching,
}: Props): JSX.Element {
  let component: ComponentType<any>;

  useEffect(() => {
    scrollToTop();
  }, [results]);

  switch (type) {
    case 'podcast':
      component = ListablePodcast;
      break;
    case 'episode':
      component = ListableEpisode;
      break;
    case 'user':
      component = ListableUser;
      break;
    default:
      break;
  }

  const memoList = useMemo(() => <List component={component} data={results} />, [results]);

  return !isSearching
    ? memoList
    : <Loader />;
}

export default SearchResults;
