import React from 'react';
import PropTypes from 'prop-types';


const SearchControlles = ({
  setFilters, setSortBy, setType, type,
}) => (
  <div className="search-controlles">
    <div className="filter-sort">
      <button type="button" onClick={setFilters}>Filters</button>
      <button type="button" onClick={setSortBy}>Sort</button>
    </div>
    <div className="type">
      <button type="button" className={type === 'podcast' ? 'active' : ''} name="podcast" onClick={(e => setType(e.target.name))}>Podcasts</button>
      <button type="button" className={type === 'episode' ? 'active' : ''} name="episode" onClick={(e => setType(e.target.name))}>Episodes</button>
      <button type="button" className={type === 'user' ? 'active' : ''} name="user" onClick={(e => setType(e.target.name))}>Users</button>
    </div>
  </div>
);

SearchControlles.propTypes = {
  setFilters: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default SearchControlles;
