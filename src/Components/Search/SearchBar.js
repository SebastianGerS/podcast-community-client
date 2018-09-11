import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };

    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  search(e) {
    e.preventDefault();
    const {
      type, offset, search, path,
    } = this.props;
    const { term } = this.state;

    search({
      term, type, offset, path,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { isLogedIn, redirectToSearch, path } = this.props;
    const { term } = this.state;

    return (
      <div className="searchbar">
        {redirectToSearch && path !== '/search' ? <Redirect to="/search" /> : null}
        <form onSubmit={this.search}>
          <input placeholder="Search..." name="term" value={term} onChange={this.handleChange} />
        </form>
        <div>
          { isLogedIn
            ? <button type="button" className="follows" />
            : <Link to="/register">Register</Link>
          }
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  isLogedIn: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  search: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  redirectToSearch: PropTypes.bool.isRequired,
};

export default SearchBar;
