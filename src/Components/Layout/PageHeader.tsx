import React from 'react';

interface Props {
  name: string;
}

const PageHeader = ({ name }: Props): JSX.Element => (
  <h2 className="page-header">{name === '' ? 'Home' : `${name.charAt(0).toUpperCase()}${name.slice(1)}`}</h2>
);

export default PageHeader;
