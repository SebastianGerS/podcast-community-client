import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from '../../Helpers/List';
import ListablePodcast from './ListablePodcast';
import Category from '../../Models/Category';

function Folder({
  data, isCreating, createCategory, userId, toggleNewCategory, deleteCategory,
}) {
  const [name, setName] = useState();

  const addCategory = (e) => {
    e.preventDefault();
    if (name !== '') {
      createCategory({ name, userId });
      toggleNewCategory();
    }
  };

  return (
    <div className="folder">
      <button type="button" className="remove" onClick={() => deleteCategory(userId, data._id)} aria-label="remove" />
      {isCreating
        ? <form onSubmit={addCategory}><input value={name} onChange={e => setName(e.target.value)} placeholder="Category Name" /></form>
        : (
          <Link to={`/my-subscriptions/categories/${data._id}`}>
            <div className="podcasts">
              <h3>{data.name}</h3>
              <List component={ListablePodcast} data={data.podcasts} />
            </div>
          </Link>
        )
    }
    </div>
  );
}

Folder.propTypes = {
  data: PropTypes.shape(Category),
  createCategory: PropTypes.func.isRequired,
  isCreating: PropTypes.bool,
  userId: PropTypes.string.isRequired,
  toggleNewCategory: PropTypes.func,
  deleteCategory: PropTypes.func.isRequired,
};

Folder.defaultProps = {
  isCreating: false,
  data: new Category(),
  toggleNewCategory: null,
};

export default Folder;
