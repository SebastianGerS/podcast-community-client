import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Podcast from '../../Models/Podcast';
import Star from '../../Assets/Icons/star.svg';
import { getDatefromMilisecond } from '../../Helpers/Time';

class ListablePodcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribing: false,
    };

    this.toggleSubscription = this.toggleSubscription.bind(this);
  }

  toggleSubscription() {
    const { data, atemptToggleSubsription, isLogedIn } = this.props;
    if (isLogedIn) {
      this.setState({
        subscribing: true,
      });
      atemptToggleSubsription(data.id);
    }
  }

  render() {
    const {
      data, isToggelingSubscription, subscriptions, isLogedIn,
    } = this.props;

    const { subscribing } = this.state;

    let subscribeText = 'Subscribe';
    if (isLogedIn) {
      if (isToggelingSubscription && subscribing) {
        subscribeText = '';
      } else {
        subscribeText = subscriptions.includes(data.id) ? 'Unsubscribe' : 'Subscribe';
      }
    }
    return (
      <div className="listable-podcast-searchresult">
        <h3>{data.title_original.length > 35 ? `${data.title_original.substring(0, 31)}...` : data.title_original}</h3>
        <div>
          <figure>
            <img src={data.thumbnail} alt="podcastlogo" />
          </figure>
          <p>
            <span>{`By ${data.publisher_original.length > 27 ? `${data.publisher_original.substring(0, 23)}...` : data.publisher_original}`}</span>
            <span>{ `Last updated ${getDatefromMilisecond(data.lastest_pub_date_ms)}`}</span>
          </p>
        </div>
        <div>
          <p>
            {data.description_original.length > 150 ? `${data.description_original.substring(0, 147)}...` : data.description_original}
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
  subscriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLogedIn: PropTypes.bool.isRequired,
};

export default ListablePodcast;
