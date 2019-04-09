import React from 'react';
import Star from '../../Assets/Icons/star.svg';

interface Props {
  rating: number;
}
function Rating({ rating }: Props): JSX.Element {
  return (
    <figure className="rating">
      <img src={Star} alt="podcastLogo" />
      <figcaption>{rating !== 0 ? rating : 'Not rated'}</figcaption>
    </figure>
  );
}

export default Rating;
