import React from 'react';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';

const List = ({ component: Component, data }) => (
  <div className="list">
    {data.map(elementData => <Component data={elementData} key={uuidv4()} />)}
  </div>
);

List.propTypes = {
  component: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
export default List;
