import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  imageSrc: string;
  imageAlt: string;
  linkTo?: string;
}

const ImageLink = ({ imageSrc, linkTo, imageAlt }: Props): JSX.Element => (
  linkTo ? (
    <Link to={linkTo}>
      <figure>
        <img src={imageSrc} alt={imageAlt} />
      </figure>
    </Link>
  )
    : (
      <figure>
        <img src={imageSrc} alt={imageAlt} />
      </figure>
    )
);

export default ImageLink;
