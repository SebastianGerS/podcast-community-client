import React, {
  useState, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import List from '../../Helpers/List';
import Podcast from '../../Models/Podcast';
import ListablePodcast from '../../Containers/ListablePodcast';

function Category({
  addToCategory, categoryId, userId, subscriptions, categories,
}) {
  const calcInitialCategory = () => {
    const [currentCategory] = categories.filter(c => c._id === categoryId);
    return currentCategory;
  };

  const calcInitialIdsNotInCategory = () => {
    const [currentCategory] = categories.filter(c => c._id === categoryId);
    const categorypodcastIds = currentCategory.podcasts.map(p => p.id);
    const subscriptionIds = subscriptions.map(subscription => subscription.id);
    const idsNotInCurrentCategory = subscriptionIds.filter(id => !categorypodcastIds.includes(id));
    return idsNotInCurrentCategory;
  };

  const calcInitialPodcast = () => {
    const idsNotInCurrentCategory = calcInitialIdsNotInCategory();
    return idsNotInCurrentCategory[0];
  };

  const [podcast, setPodcast] = useState(() => calcInitialPodcast());
  const [category, setCategory] = useState(() => calcInitialCategory());
  const [idsNotInCategory, setIdNotInCategory] = useState(() => calcInitialIdsNotInCategory());

  const attemptAddToCategory = () => {
    addToCategory({ userId, categoryId: category._id, body: { podcasts: podcast } });
  };

  useEffect(() => {
    const [currentCategory] = categories.filter(c => c._id === categoryId);
    const categorypodcastIds = currentCategory.podcasts.map(p => p.id);
    const subscriptionIds = subscriptions.map(subscription => subscription.id);
    const idsNotInCurrentCategory = subscriptionIds.filter(id => !categorypodcastIds.includes(id));

    setPodcast(idsNotInCurrentCategory[0]);
    setCategory(currentCategory);
    setIdNotInCategory(idsNotInCurrentCategory);
  }, [categories]);
  const memoList = useMemo(
    () => <List component={ListablePodcast} data={category.podcasts} />,
    [category.podcasts],
  );
  return (
    <div className="category">
      <h3>{category.name}</h3>
      { idsNotInCategory.length !== 0
        && (
        <form className="subscriptions">
          <select id="podcast" name="podcast" value={podcast} onChange={e => setPodcast(e.target.value)}>
            {subscriptions.map((subscription) => {
              if (idsNotInCategory.includes(subscription.id)) {
                return <option key={subscription.id} id="podcast" value={subscription.id}>{subscription.title}</option>;
              }
              return null;
            })
          }
          </select>
          <button type="button" onClick={attemptAddToCategory} className="add-button">Add</button>
        </form>
        )
      }
      { category.podcasts !== 0
        ? memoList
        : null}

    </div>
  );
}
Category.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape(Podcast)).isRequired,
  subscriptions: PropTypes.arrayOf(PropTypes.shape(Podcast)).isRequired,
  userId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  addToCategory: PropTypes.func.isRequired,
};

export default Category;
