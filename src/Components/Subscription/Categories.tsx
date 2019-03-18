import React, { useState } from 'react';
import List from '../../Helpers/List';
import Folder from '../../Containers/Folder';
import { Category } from '../../Models/Category';

interface Props {
  categories: Category[];
}

function Categories({ categories }: Props): JSX.Element {
  const [isCreating, setIsCreating] = useState();
  const props = [isCreating, setIsCreating];
  return (
    <div className="categories">
      {!isCreating
        && <button type="button" onClick={() => setIsCreating(!isCreating)} className="add-button">Add Category</button>
      }
      {isCreating
        && <Folder isCreating={isCreating} setIsCreating={setIsCreating} />}
      { typeof categories[0].name === 'string'
        ? <List component={Folder} data={categories} {...props} />
        : null}
    </div>
  );
}

export default Categories;
