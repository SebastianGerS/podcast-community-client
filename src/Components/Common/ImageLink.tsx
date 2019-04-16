import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  imageSrc: string;
  imageAlt: string;
  linkTo?: string;
  caption?: string;
}

const ImageLink = ({
  imageSrc, linkTo, imageAlt, caption,
}: Props): JSX.Element => (
  linkTo ? (
    <Link to={linkTo}>
      <figure>
        <img src={imageSrc} alt={imageAlt} />
        <figcaption>{caption}</figcaption>
      </figure>
    </Link>
  )
    : (
      <figure>
        <img src={imageSrc} alt={imageAlt} />
        <figcaption>{caption}</figcaption>
      </figure>
    )
);

export default ImageLink;
