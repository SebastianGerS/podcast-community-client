import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Episode from '../../Models/Episode';
import Star from '../../Assets/Icons/star.svg';
import { getDatefromMilisecond } from '../../Helpers/Time';

class ListableEpisode extends Component {
  constructor(props) {
    super(props);

    this.toggleEpisode = this.toggleEpisode.bind(this);
  }

  toggleEpisode() {
    const {
      selectEpisode, stop, data, episode,
    } = this.props;
    stop();
    if (episode.id !== data.id) {
      selectEpisode(data);
    }
  }

  render() {
    const {
      data, isPlaying, episode,
    } = this.props;

    return (
      <div className="listable-episode">
        <h3>{data.title_original.length > 35 ? `${data.title_original.substring(0, 31)}...` : data.title_original}</h3>
        <div>
          <figure>
            <img src={data.thumbnail} alt="podcastlogo" />
          </figure>
          <p>
            <span>{data.podcast_title_original.length > 30 ? `${data.podcast_title_original.substring(0, 26)}...` : data.podcast_title_original}</span>
            <span>{`By ${data.publisher_original.length > 27 ? `${data.publisher_original.substring(0, 23)}...` : data.publisher_original}`}</span>
            <span>{`Relseed: ${getDatefromMilisecond(data.pub_date_ms)}`}</span>
          </p>
        </div>
        <div>
          <figure className="info-box">
            <img src={Star} alt="star" />
            <figcaption>5.0</figcaption>
          </figure>
          <div className="info-box">
            <p>
                length:&ensp;
              <span>
                {data.audio_length}
              </span>
            </p>
          </div>
        </div>
        <div>
          <p>
            {data.description_original.length > 150 ? `${data.description_original.substring(0, 147)}...` : data.description_original}
          </p>
        </div>
        <div>
          <button type="button" className="dowload-button" />
          <button type="button" className={`${episode.id === data.id && isPlaying ? 'pause-button' : 'play-button'}`} onClick={this.toggleEpisode} />
          <button type="button" className="more-options-button" />
        </div>
      </div>
    );
  }
}

ListableEpisode.propTypes = {
  data: PropTypes.objectOf(Episode).isRequired,
  selectEpisode: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  episode: PropTypes.shape(Episode).isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default ListableEpisode;
