import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  term, offset, type, search, morePages,
}) => (
  <div className="pagination">
    { offset > 10
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
    {morePages && (
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
Pagination.propTypes = {
  term: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  morePages: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
};
export default Pagination;
