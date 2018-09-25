import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '../../Helpers/List';
import Folder from '../../Containers/Folder';
import Podcast from '../../Models/Podcast';


class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreating: false,
    };
    this.toggleNewCategory = this.toggleNewCategory.bind(this);
  }

  toggleNewCategory() {
    const { isCreating } = this.state;

    this.setState({
      isCreating: !isCreating,
    });
  }

  render() {
    const { categories } = this.props;
    const { isCreating } = this.state;
    return (
      <div className="categories">
        {!isCreating
          && <button type="button" onClick={this.toggleNewCategory} className="add-button">Add Category</button>}
        { typeof categories[0].name === 'string'
          ? <List component={Folder} data={categories} />
          : null}
        {isCreating
          && <Folder isCreating={isCreating} toggleNewCategory={this.toggleNewCategory} />}
      </div>
    );
  }
}
Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape(Podcast)).isRequired,
};

export default Categories;
