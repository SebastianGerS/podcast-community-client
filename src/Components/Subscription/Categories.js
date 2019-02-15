import React, { useState } from 'react';
import PropTypes from 'prop-types';
import List from '../../Helpers/List';
import Folder from '../../Containers/Folder';
import Podcast from '../../Models/Podcast';

function Categories({ categories }) {
  const [isCreating, setIsCreating] = useState();

  const toggleNewCategory = () => {
    setIsCreating(!isCreating);
  };

  return (
    <div className="categories">
      {!isCreating
        && <button type="button" onClick={toggleNewCategory} className="add-button">Add Category</button>}
      {isCreating
        && <Folder isCreating={isCreating} toggleNewCategory={toggleNewCategory} />}
      { typeof categories[0].name === 'string'
        ? <List component={Folder} data={categories} />
        : null}
    </div>
  );
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape(Podcast)).isRequired,
};

export default Categories;
