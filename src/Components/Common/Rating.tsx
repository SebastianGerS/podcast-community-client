import React from 'react';
import { getRatingIcon } from '../../Helpers/Utils';

interface Props {
  rating: number;
}

function Rating({ rating }: Props): JSX.Element {
  const ratingIcon = getRatingIcon(rating);
  return (
    <figure title="rating" className="rating">
      <div className={ratingIcon} />
      <figcaption>{rating !== 0 ? rating.toFixed(1) : ' — '}</figcaption>
    </figure>
  );
}

export default Rating;
