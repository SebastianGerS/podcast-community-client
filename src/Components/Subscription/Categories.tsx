import React, { useState } from 'react';
import List from '../Common/List';
import Folder from '../../Containers/Subscription/Folder';
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
      { categories.length > 0
        ? <List component={Folder} data={categories} {...props} />
        : null}
    </div>
  );
}

export default Categories;
