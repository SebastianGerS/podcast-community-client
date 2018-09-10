import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SearchBar = ({ isLogedIn }) => (
  <div className="searchbar">
    <input placeholder="Search..." />
    <div>
      { isLogedIn
        ? <button type="button" className="follows" />
        : <Link to="/register">Register</Link>
      }
    </div>
  </div>
);

SearchBar.propTypes = {
  isLogedIn: PropTypes.bool.isRequired,
};

export default SearchBar;
