import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import UserCategory from '../Containers/Category';
import { scrollToTop } from '../Helpers/UserAgent';

function Category({ params }) {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="Category">
      <UserCategory categoryId={params.categoryId} />
    </div>
  );
}

Category.propTypes = {
  params: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Category;
