import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({ name }) => (
  <h2 className="page-header">{name === '' ? 'Home' : `${name.charAt(0).toUpperCase()}${name.slice(1)}`}</h2>
);

PageHeader.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PageHeader;
