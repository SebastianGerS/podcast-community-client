import React from 'react';
import Star from '../../Assets/Icons/star.svg';

function Rating(): JSX.Element {
  return (
    <figure className="rating">
      <img src={Star} alt="podcastLogo" />
      <figcaption>5.0</figcaption>
    </figure>
  );
}

export default Rating;
