/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, {
  MouseEvent, useState, ChangeEvent, useEffect,
} from 'react';
import { List } from 'immutable';
import uuid from 'uuid';
import { Filters } from '../../Models/Filters';
import MultiSelect from '../Common/MultiSelect';
import { Option } from '../../Models/Option';
import { Genre } from '../../Models/Genre';


interface Props {
  attemptSetType: (type: string) => void;
  type: string;
  filters: Filters;
  attemptSetFilters: (filters: Filters) => void;
  getFilters: () => void;
  languages: List<string>;
  genres: List<Genre>;
}

export interface NamedButton extends HTMLButtonElement {
  name: string;
}

function SearchControlles<T extends Option>({
  attemptSetType, type, filters, attemptSetFilters, getFilters, languages, genres,
}: Props): JSX.Element {
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getFilters();
  }, []);

  const setType = (e: MouseEvent<NamedButton>): void => {
    if (e.currentTarget) {
      attemptSetType(e.currentTarget.name);
    }
  };

  const setFilters = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    attemptSetFilters({
      genres: filters.genres,
      field: filters.field,
      language: filters.language,
      len_min: filters.len_min,
      len_max: filters.len_max,
      [`${name}`]: value,
    });
  };

  const setGenres = (option: Option): void => {
    let newValue;

    if (option) {
      newValue = filters.genres.contains(option)
        ? filters.genres.remove(filters.genres.indexOf(option))
        : filters.genres.push(option);
    } else {
      newValue = List();
    }


    attemptSetFilters({
      field: filters.field,
      language: filters.language,
      len_min: filters.len_min,
      len_max: filters.len_max,
      genres: newValue,
    });
  };

  const languagesOptions = languages.map(language => (
    <option value={language} id="language" key={uuid.v4()}>{language}</option>
  ));

  return (
    <div className="search-controlles">
      <div className="filter-sort">
        <button
          className={showFilters ? 'open' : 'closed'}
          type="button"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
        </button>
        <select className="sortby" name="sortby" id="sortby" value={0}>
          <option value={0} id="sortby">Relevance</option>
          <option value={1} id="sortby">Date</option>
        </select>
      </div>
      {showFilters && (
        <div className="filters">
          <label htmlFor="genres">
            genres:
            <MultiSelect
              options={genres}
              selectedOptions={filters.genres}
              className="genres"
              id="genres"
              toggleValue={setGenres}
            />
          </label>
          <label htmlFor="field">
            search in:
            <select name="field" id="field" value={filters.field} onChange={setFilters}>
              <option value={undefined}>Any field</option>
              <option value="title" id="field">Title</option>
              <option value="description" id="field">Description</option>
              <option value="author" id="field">Author</option>
            </select>
          </label>
          <label htmlFor="language">
            language:
            <select name="language" id="language" value={filters.language} onChange={setFilters}>
              {languagesOptions}
            </select>
          </label>
          { type === 'episode' && (
            <div className="episode-filters">
              <h3>Episode Length</h3>
              <div className="min-max-filters">
                <label htmlFor="len_max">
                  Max:
                  <input
                    type="number"
                    name="len_max"
                    id="len_max"
                    value={filters.len_max}
                    onChange={setFilters}
                  />
                </label>
                <label htmlFor="min">
                  Min:
                  <input
                    type="number"
                    name="len_min"
                    id="min"
                    value={filters.len_min}
                    onChange={setFilters}
                  />
                </label>
              </div>
            </div>
          )
          }
        </div>
      )
      }
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
