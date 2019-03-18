import React, { ComponentType } from 'react';
import uuid from 'uuid';
import { User } from '../../Models/User';
import EmptyTableRow from './EmptyTableRow';

interface TableRowProps {
  data: User;
}
interface Props {
  component: ComponentType<TableRowProps>;
  data: User[];
}

const TableBody = ({ component: Component, data }: Props): JSX.Element => {
  const rows: ComponentType | JSX.Element[] = [];

  data.map((elementData: User) => {
    rows.push(<Component data={elementData} key={uuid.v4()} />);
    rows.push(<EmptyTableRow key={uuid.v4()} />);
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

export default TableBody;
