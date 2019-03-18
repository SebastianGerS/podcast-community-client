import React from 'react';
import LoaderIcon from '../../Assets/Icons/loader.svg';

const Loader = (): JSX.Element => (
  <div className="loading">
    <img src={LoaderIcon} className="loading-icon" alt="searching..." />
  </div>
);

export default Loader;
