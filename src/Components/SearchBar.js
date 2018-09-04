import React from 'react';
import { Link } from 'react-router-dom';

const SearchBar = () => (
  <div className="searchbar">
    <input placeholder="Search..." />
    <div>
      <Link to="/register">Register</Link>
    </div>
  </div>
);

export default SearchBar;
