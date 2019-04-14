import React, { useState, useEffect, MouseEvent } from 'react';
import Categories from './Categories';
import Catalog from './Catalog';
import { User } from '../../Models/User';
import { Podcast } from '../../Models/Podcast';
import { Category } from '../../Models/Category';
import Loader from '../Layout/Loader';

interface Props {
  getSubscriptions: (userId: string) => void;
  subscriptions: Podcast[];
  user: User;
  categories: Category[];
  isFetchingSubscriptions: boolean;
}
function MySubscriptions({
  getSubscriptions, subscriptions, user, categories, isFetchingSubscriptions,
}: Props): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (typeof user._id === 'string') {
      getSubscriptions(user._id);
    }
  }, []);

  const changeTab = (e: MouseEvent<HTMLButtonElement>): void => {
    setActiveTab(+e.currentTarget.value);
  };

  return (
    <div className="my-subscriptions">
      <div className="subscription-navigation">
        <h2>My Subscriptions</h2>
        <div>
          <ul>
            <li>
              <button
                type="button"
                value={0}
                onClick={changeTab}
                className={activeTab === 0 ? 'active' : ''}
              >
                Catalog
              </button>
            </li>
            <li>
              <button
                type="button"
                value={1}
                onClick={changeTab}
                className={activeTab === 1 ? 'active' : ''}
              >
                Categories
              </button>
            </li>
          </ul>
        </div>
      </div>
      { activeTab === 0 && subscriptions.length !== 0
        && <Catalog subscriptions={subscriptions} />
      }
      { activeTab === 1 && subscriptions.length !== 0
        && <Categories categories={categories} />
      }
      {subscriptions.length === 0 && !isFetchingSubscriptions
       && (
         <h2>
           {'You don\'t have any subscriptions'}
         </h2>
       )
      }
      {isFetchingSubscriptions
        && <Loader />
      }
      <div />
    </div>
  );
}

export default MySubscriptions;
