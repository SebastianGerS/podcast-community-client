import React from 'react';

interface Props {
  term: string;
  offset: number;
  type: string;
  search: Function;
  morePages: boolean;
  isSearching: boolean;
}

const Pagination = ({
  term, offset, type, search, morePages, isSearching,
}: Props): JSX.Element => (
  <div className="pagination">
    { offset > 10 && !isSearching
      && (
        <button
          type="button"
          className="prev-page"
          onClick={() => search({
            term, offset: offset - 20, type,
          })}
        >
          PrevPage
        </button>
      )
    }
    {morePages && !isSearching && (
      <button
        type="button"
        className="next-page"
        onClick={() => search({
          term, offset, type,
        })}
      >
        NextPage
      </button>
    )}
  </div>
);

export default Pagination;
