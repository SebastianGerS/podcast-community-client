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

  componentDidUpdate(prevProps) {
    const { type } = this.props;
    if (prevProps.type !== type) {
      this.search();
    }
  }

  search(e) {
    if (e) e.preventDefault();

    const {
      type, search, path,
    } = this.props;
    const { term } = this.state;

    search({
      term, type, offset: 0, path,
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
            ? <button type="button" aria-label="toggle-follows-modal" className="follows" />
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
  search: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  redirectToSearch: PropTypes.bool.isRequired,
};

export default SearchBar;
