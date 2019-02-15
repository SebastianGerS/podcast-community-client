import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function SearchBar({
  type, search, isLogedIn, redirectToSearch, path,
}) {
  const [term, setTerm] = useState('');

  const triggerSearch = (e) => {
    if (e) e.preventDefault();
    search({
      term, type, offset: 0, path,
    });
  };

  useEffect(() => {
    if (term.length > 3) {
      triggerSearch();
    }
  }, [type, term]);

  return (
    <div className="searchbar">
      {redirectToSearch && path !== '/search' ? <Redirect to="/search" /> : null}
      <form onSubmit={triggerSearch}>
        <input placeholder="Search..." name="term" value={term} onChange={e => setTerm(e.target.value)} />
      </form>
      <div>
        { isLogedIn
          ? <button type="button" aria-label="toggle-follows-modal" className="follows" />
          : <Link to="/register">Register</Link>
        }
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  isLogedIn: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  redirectToSearch: PropTypes.bool.isRequired,
};

export default SearchBar;
