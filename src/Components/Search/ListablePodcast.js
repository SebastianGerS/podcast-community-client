import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Podcast from '../../Models/Podcast';
import Star from '../../Assets/Icons/star.svg';
import { getDatefromMilisecond } from '../../Helpers/Time';
import User from '../../Models/User';

class ListablePodcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribing: false,
    };

    this.toggleSubscription = this.toggleSubscription.bind(this);
  }

  toggleSubscription() {
    const {
      data, atemptToggleSubsription, isLogedIn, user,
    } = this.props;
    if (isLogedIn) {
      this.setState({
        subscribing: true,
      });
      atemptToggleSubsription(user._id, data.id);
    }
  }

  render() {
    const {
      data, isToggelingSubscription, user, isLogedIn,
    } = this.props;

    const { subscribing } = this.state;
    const title = typeof data.title === 'string' ? data.title : data.title_original;
    const publisher = typeof data.publisher === 'string' ? data.publisher : data.publisher_original;
    const description = typeof data.description === 'string' ? data.description : data.description_original;

    let subscribeText = 'Subscribe';
    if (isLogedIn) {
      if (isToggelingSubscription && subscribing) {
        subscribeText = '';
      } else {
        subscribeText = user.subscriptions.includes(data.id) ? 'Unsubscribe' : 'Subscribe';
      }
    }

    return (
      <div className="listable-podcast-searchresult">
        <h3>{title.length > 35 ? `${title.substring(0, 31)}...` : title}</h3>
        <div>
          <figure>
            <img src={data.thumbnail} alt="podcastlogo" />
          </figure>
          <p>
            <span>{`By ${publisher.length > 27 ? `${publisher.substring(0, 23)}...` : publisher}`}</span>
            <span>{ `Last updated ${getDatefromMilisecond(data.lastest_pub_date_ms)}`}</span>
          </p>
        </div>
        <div>
          <p>
            {description.length > 150 ? `${description.substring(0, 147)}...` : description}
          </p>
        </div>
        <div>
          <figure className="rating">
            <img src={Star} alt="podcastLogo" />
            <figcaption>5.0</figcaption>
          </figure>
          <button
            type="button"
            className={`subscribe-button ${isToggelingSubscription && subscribing ? 'loading' : ''} ${subscribeText === 'Unsubscribe' ? 'unsubscribe' : ''}`}
            onClick={this.toggleSubscription}
          >
            {subscribeText}
          </button>
          <button type="button" aria-label="more-options-button" className="more-options-button" />
        </div>
      </div>
    );
  }
}

ListablePodcast.propTypes = {
  data: PropTypes.shape(Podcast).isRequired,
  atemptToggleSubsription: PropTypes.func.isRequired,
  isToggelingSubscription: PropTypes.bool.isRequired,
  user: PropTypes.shape(User).isRequired,
  isLogedIn: PropTypes.bool.isRequired,
};

export default ListablePodcast;
