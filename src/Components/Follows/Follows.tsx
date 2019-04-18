import React, { useState, MouseEvent } from 'react';
import { User } from '../../Models/User';
import Following from './Following';
import Followers from './Followers';

interface Props {
  followers: User[];
  requests: User[];
  following: User[];
  tabIndex: string | undefined;
}

function Follows({
  followers, requests, following, tabIndex,
}: Props): JSX.Element {
  const [activeTab, setActiveTab] = useState(tabIndex ? +tabIndex : 0);

  const changeTab = (e: MouseEvent<HTMLButtonElement>): void => {
    setActiveTab(+e.currentTarget.value);
  };

  return (
    <div className="follows">
      <h2>Follows</h2>
      <div className="follows-navigation">
        <div>
          <ul>
            <li>
              <button
                type="button"
                value={0}
                onClick={changeTab}
                className={activeTab === 0 ? 'active' : ''}
              >
                Following
              </button>
            </li>
            <li>
              <button
                type="button"
                value={1}
                onClick={changeTab}
                className={activeTab === 1 ? 'active' : ''}
              >
                Followers
              </button>
            </li>
          </ul>
        </div>
      </div>
      { activeTab === 0
        && <Following following={following} />
      }
      { activeTab === 1
        && <Followers followers={followers} requests={requests} />
      }
      <div />
    </div>
  );
}

export default Follows;
