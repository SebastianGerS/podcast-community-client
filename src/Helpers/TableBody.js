import React from 'react';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import EmptyTableRow from './EmptyTableRow';

const TableBody = ({ component: Component, data }) => {
  const rows = [];

  data.map((elementData) => {
    rows.push(<Component data={elementData} key={uuidv4()} />);
    rows.push(<EmptyTableRow key={uuidv4()} />);
    return elementData;
  });

  return (
    <tbody className="table">
      {
      rows
    }
    </tbody>
  );
};

TableBody.propTypes = {
  component: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(Immutable.Record).isRequired,
};

export default TableBody;
