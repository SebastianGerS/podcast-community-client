import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import List from '../Common/List';
import ListablePodcast from './ListablePodcast';
import { Category } from '../../Models/Category';

interface Props {
  data?: Category;
  isCreating: boolean;
  createCategory: (data: object) => void;
  userId: string;
  deleteCategory: (userId: string, categoryId: string) => void;
  setIsCreating: (boolean: boolean) => void;
}

function Folder({
  data = new Category(), isCreating, createCategory, userId, deleteCategory, setIsCreating,
}: Props): JSX.Element {
  const [name, setName] = useState();
  const categoryId = typeof data._id === 'string' ? data._id : '';

  const addCategory = (e: FormEvent<HTMLElement>): void => {
    e.preventDefault();
    if (name !== '') {
      createCategory({ name, userId });
      setIsCreating(!isCreating);
    }
  };

  const removeCategory = (): void => {
    if (isCreating) {
      setIsCreating(!isCreating);
    } else {
      deleteCategory(userId, categoryId);
    }
  };

  return (
    <div className="folder">
      <button title="delete" type="button" className="remove" onClick={removeCategory} aria-label="remove" />
      {isCreating
        ? (
          <form onSubmit={addCategory}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Category Name" />
          </form>
        )
        : (
          <Link to={`/my-subscriptions/categories/${data._id}`}>
            <div className="podcasts">
              <h3>{data.name}</h3>
              <List component={ListablePodcast} data={Array.isArray(data.podcasts) ? data.podcasts : []} />
            </div>
          </Link>
        )
      }
    </div>
  );
}

export default Folder;
