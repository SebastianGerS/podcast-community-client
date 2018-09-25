import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserCategory from '../Containers/Category';
import { scrollToTop } from '../Helpers/UserAgent';

class Category extends Component {
  componentDidMount() {
    scrollToTop();
  }

  render() {
    const { params } = this.props;
    return (
      <div className="Category">
        <UserCategory categoryId={params.categoryId} />
      </div>
    );
  }
}

Category.propTypes = {
  params: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Category;
