import React, { Component } from 'react';
import SearchInterface from '../Containers/SearchInterface';
import { scrollToTop } from '../Helpers/UserAgent';

class Search extends Component {
  componentDidMount() {
    scrollToTop();
  }

  render() {
    return (
      <div className="Search">
        <SearchInterface />
      </div>
    );
  }
}


export default Search;
