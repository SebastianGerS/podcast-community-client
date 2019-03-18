import React, { MouseEvent } from 'react';

interface Props {
  atemptSetType: (type: string) => void;
  type: string;
}

export interface NamedButton extends HTMLButtonElement {
  name: string;
}

function SearchControlles({
  atemptSetType, type,
}: Props): JSX.Element {
  const setType = (e: MouseEvent<NamedButton>): void => {
    if (e.currentTarget) {
      atemptSetType(e.currentTarget.name);
    }
  };

  return (
    <div className="search-controlles">
      <div className="filter-sort">
        <button type="button">Filters</button>
        <button type="button">Sort</button>
      </div>
      <div className="type">
        <button
          type="button"
          className={type === 'podcast' ? 'active' : ''}
          name="podcast"
          onClick={setType}
        >
          Podcasts
        </button>
        <button
          type="button"
          className={type === 'episode' ? 'active' : ''}
          name="episode"
          onClick={setType}
        >
          Episodes
        </button>
        <button
          type="button"
          className={type === 'user' ? 'active' : ''}
          name="user"
          onClick={setType}
        >
          Users
        </button>
      </div>
    </div>
  );
}
export default SearchControlles;
