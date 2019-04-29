import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { SearchData } from '../../Actions/Search';
import { Filters } from '../../Models/Filters';
import ToggleFollowsModal from '../../Containers/Follows/ToggleFollowsModal';

interface Props {
  search: (data: SearchData) => void;
  closeModal: () => void;
  isLogedIn: boolean;
  path: string;
  filters: Filters;
  sorting: string;
  type: string;
}

function SearchBar({
  type, search, isLogedIn, path, filters, sorting, closeModal,
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
      closeModal();
    }
  }, [type, term, filters, sorting]);

  return (
    <div className="searchbar">
      <form onSubmit={triggerSearch}>
        <input placeholder="Search..." name="term" value={term} onChange={e => setTerm(e.target.value)} />
      </form>
      <div>
        { isLogedIn
          ? <ToggleFollowsModal />
          : <Link to="/register" onClick={closeModal}>Register</Link>
        }
      </div>
    </div>
  );
}

export default SearchBar;
