import React, { useState, useEffect, FormEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { SearchData } from '../../Actions/Search';
import { Filters } from '../../Models/Filters';

interface Props {
  search: (data: SearchData) => void;
  toggleFollowsModal: () => void;
  isLogedIn: boolean;
  redirectToSearch: boolean;
  followsOnline: boolean;
  path: string;
  filters: Filters;
  sorting: string;
  type: string;
}

function SearchBar({
  type, search, isLogedIn, redirectToSearch, path, filters, sorting, toggleFollowsModal, followsOnline,
}: Props): JSX.Element {
  const [term, setTerm] = useState('');

  const triggerSearch = (e: FormEvent<HTMLFormElement> | null = null): void => {
    if (e) e.preventDefault();
    search({
      term, filters, type, offset: 0, path, sorting,
    });
  };

  useEffect(() => {
    if (term.length > 3) {
      triggerSearch();
    }
  }, [type, term, filters, sorting]);

  return (
    <div className="searchbar">
      {redirectToSearch && path !== '/search' ? <Redirect to="/search" /> : null}
      <form onSubmit={triggerSearch}>
        <input placeholder="Search..." name="term" value={term} onChange={e => setTerm(e.target.value)} />
      </form>
      <div>
        { isLogedIn
          ? (
            <button
              type="button"
              aria-label="toggle-follows-modal"
              className={`toggle-follows-modal ${followsOnline ? 'online' : 'offline'}`}
              onClick={() => toggleFollowsModal()}
            />
          )
          : <Link to="/register">Register</Link>
        }
      </div>
    </div>
  );
}

export default SearchBar;
