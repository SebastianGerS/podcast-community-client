import React from 'react';

interface Props {
  text: string | number;
  icon?: boolean;
  iconClass?: string;
}

function InfoBox({ text, icon, iconClass }: Props): JSX.Element {
  let html;

  if (icon) {
    html = (
      <figure className="info-box">
        <div className={iconClass} />
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
