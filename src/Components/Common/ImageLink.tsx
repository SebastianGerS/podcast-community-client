import React from 'react';
import { Link } from 'react-router-dom';
import { Markup } from 'interweave';

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
        <Markup content={caption} tagName="figcaption" />
      </figure>
    </Link>
  )
    : (
      <figure>
        <img src={imageSrc} alt={imageAlt} />
        <Markup content={caption} tagName="figcaption" />
      </figure>
    )
);

export default ImageLink;
