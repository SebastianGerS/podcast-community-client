import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from '../../Helpers/List';
import ListablePodcast from './ListablePodcast';
import Category from '../../Models/Category';

class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.removeCategory = this.removeCategory.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addCategory = this.addCategory.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    this.setState({
      name: value,
    });
  }

  addCategory(e) {
    e.preventDefault();
    const { createCategory, userId, toggleNewCategory } = this.props;
    const { name } = this.state;

    if (name !== '') {
      createCategory({ name, userId });
      toggleNewCategory();
    }
  }

  removeCategory() {
    const { deleteCategory, userId, data } = this.props;

    deleteCategory(userId, data._id);
  }

  render() {
    const { data, isCreating } = this.props;
    const { name } = this.state;

    return (
      <div className="folder">
        <button type="button" className="remove" onClick={this.removeCategory} aria-label="remove" />
        {isCreating
          ? <form onSubmit={this.addCategory}><input value={name} onChange={this.onChange} placeholder="Category Name" /></form>
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
