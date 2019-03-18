import React, {
  useState, useEffect, useMemo,
} from 'react';
import List from '../Common/List';
import ListablePodcast from '../../Containers/Search/ListablePodcast';
import { Podcast } from '../../Models/Podcast';
import { Category } from '../../Models/Category';

interface Props {
  addToCategory: (data: object) => void;
  categoryId: string;
  userId: string;
  subscriptions: Podcast[];
  categories: Category[];
}
function CategoryComponent({
  addToCategory, categoryId, userId, subscriptions, categories,
}: Props): JSX.Element {
  const calcInitialCategory = (): Category => {
    const [currentCategory] = categories.filter(c => c._id === categoryId);
    return currentCategory;
  };

  const calcInitialIdsNotInCategory = (): (string | StringConstructor)[] => {
    const [currentCategory] = categories.filter(c => c._id === categoryId);
    const categorypodcastIds = Array.isArray(currentCategory.podcasts) ? currentCategory.podcasts.map(p => p.id) : [];
    const subscriptionIds = subscriptions.map(subscription => subscription.id);
    const idsNotInCurrentCategory = subscriptionIds.filter(id => !categorypodcastIds.includes(id));
    return idsNotInCurrentCategory;
  };

  const calcInitialPodcast = (): string | StringConstructor | undefined => {
    const idsNotInCurrentCategory = calcInitialIdsNotInCategory();
    return idsNotInCurrentCategory.length !== 0 ? idsNotInCurrentCategory[0] : undefined;
  };

  const [podcast, setPodcast] = useState(() => calcInitialPodcast());
  const [category, setCategory] = useState(() => calcInitialCategory());
  const [idsNotInCategory, setIdNotInCategory] = useState(() => calcInitialIdsNotInCategory());

  const attemptAddToCategory = (): void => {
    addToCategory({ userId, categoryId: category._id, body: { podcasts: podcast } });
  };

  useEffect(() => {
    const [currentCategory] = categories.filter(c => c._id === categoryId);
    const categorypodcastIds = Array.isArray(currentCategory.podcasts) ? currentCategory.podcasts.map(p => p.id) : [];
    const subscriptionIds = subscriptions.map(subscription => subscription.id);
    const idsNotInCurrentCategory = subscriptionIds.filter(id => !categorypodcastIds.includes(id));

    setPodcast(idsNotInCurrentCategory[0]);
    setCategory(currentCategory);
    setIdNotInCategory(idsNotInCurrentCategory);
  }, [categories]);
  const memoList = useMemo(
    () => <List component={ListablePodcast} data={Array.isArray(category.podcasts) ? category.podcasts : []} />,
    [category.podcasts],
  );

  return (
    <div className="category">
      <h3>{category.name}</h3>
      { idsNotInCategory.length !== 0
        && (
          <form className="subscriptions">
            <select
              id="podcast"
              name="podcast"
              value={typeof podcast === 'string' ? podcast : undefined}
              onChange={e => setPodcast(e.target.value)}
            >
              {subscriptions.map((subscription) => {
                if (idsNotInCategory.includes(subscription.id)) {
                  const subscriptionId = typeof subscription.id === 'string' ? subscription.id : undefined;
                  return <option key={subscriptionId} id="podcast" value={subscriptionId}>{subscription.title}</option>;
                }
                return null;
              })
              }
            </select>
            <button type="button" onClick={attemptAddToCategory} className="add-button">Add</button>
          </form>
        )
      }
      { category.podcasts.length !== 0
        ? memoList
        : null}

    </div>
  );
}

export default CategoryComponent;
