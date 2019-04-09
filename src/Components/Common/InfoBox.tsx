import React from 'react';

interface Props {
  text: string | number;
  icon?: string;
  alt?: string;
}

function InfoBox({ text, icon, alt }: Props): JSX.Element {
  let html;

  if (icon) {
    html = (
      <figure className="info-box">
        <img src={icon} alt={alt} />
        <figcaption>{text}</figcaption>
      </figure>
    );
  } else {
    html = (
      <div className="info-box">
        <p>{text}</p>
      </div>
    );
  }
  return html;
}

export default InfoBox;
