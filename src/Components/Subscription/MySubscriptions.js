import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Categories from './Categories';
import Catalog from './Catalog';
import Podcast from '../../Models/Podcast';
import User from '../../Models/User';
import Category from '../../Models/Category';

function MySubscriptions({
  getSubscriptions, subscriptions, user, categories,
}) {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    getSubscriptions(user._id);
  }, []);

  return (
    <div className="my-subscriptions">
      <div className="subscription-navigation">
        <h2>My Subscriptions</h2>
        <div>
          <ul>
            <li><button type="button" value={0} onClick={e => setActiveTab(+e.target.value)} className={activeTab === 0 ? 'active' : ''}>Catalog</button></li>
            <li><button type="button" value={1} onClick={e => setActiveTab(+e.target.value)} className={activeTab === 1 ? 'active' : ''}>Categories</button></li>
          </ul>
        </div>
      </div>
      { activeTab === 0 && user.subscriptions.length !== 0
        && <Catalog subscriptions={subscriptions} />
      }
      { activeTab === 1 && user.subscriptions.length !== 0
        && <Categories categories={categories} />
      }
      {user.subscriptions.length === 0
       && (
       <h2>
         {'You don\'t have any subscriptions'}
       </h2>
       )
      }
      <div />

    </div>
  );
}

MySubscriptions.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.shape(Podcast)).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape(Category)).isRequired,
  getSubscriptions: PropTypes.func.isRequired,
  user: PropTypes.shape(User).isRequired,
};

export default MySubscriptions;
